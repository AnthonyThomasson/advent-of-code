import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

interface LineEntry {
    type: 'cmd' | 'file' | 'dir'
}

interface Cmd extends LineEntry {
    cmdType: 'cd' | 'ls'
    target: '/' | '..' | string
}

interface Dir extends LineEntry {
    id: number
    name: string
    parent: Dir | null
    children: Array<Dir | File>
}

interface File extends LineEntry {
    id: number
    name: string
    size: number
    parent: Dir | null
}

interface ProcessingContext {
    curDir: Dir | null
    tree: Array<Dir | File>
    dirSizes: Map<string, number>
}

export const solutionPartOne = (input: string): number => {
    const rootDir: Dir = {
        id: Math.floor(Math.random() * 1000),
        type: 'dir',
        name: '/',
        parent: null,
        children: [],
    }
    const startingContext: ProcessingContext = {
        curDir: rootDir,
        tree: [rootDir],
        dirSizes: new Map(),
    }

    return pipe(
        input,
        S.split('\n'),
        ARO.reduce<string, E.Either<Error, ProcessingContext>>(
            E.of(startingContext),
            (acc, line) => {
                const processedContext = pipe(
                    E.Do,
                    E.bind('acc', () => acc),
                    E.bind('line', () => E.of(line)),
                    processLine
                )
                return processedContext
            }
        ),
        E.map((ctx) => {
            return ctx.dirSizes
        }),
        E.map((dirsMap) => Array.from(dirsMap.values())),
        E.map((dirValues) => dirValues.filter((value) => value <= 100000)),
        E.map((dirValues) => dirValues.reduce((acc, value) => acc + value, 0)),
        E.getOrElse(() => 0)
    )
}

const processLine = (
    ctx: E.Either<
        Error,
        {
            acc: ProcessingContext
            line: string
        }
    >
): E.Either<Error, ProcessingContext> => {
    return pipe(
        ctx,
        E.chain(({ acc, line }) => {
            const processedAcc = pipe(
                line,
                parseLine,
                E.map((lineEntry) => {
                    if (lineEntry.type === 'cmd') {
                        const cmd = lineEntry as Cmd
                        if (cmd.cmdType === 'cd') {
                            return processCd(cmd, acc)
                        }
                        if (cmd.cmdType === 'ls') {
                            return processLs(cmd, acc)
                        }
                        return acc
                    }
                    const node = lineEntry as File | Dir
                    return addSystemNode(node, acc)
                }),
                E.getOrElse(() => acc)
            )
            return E.of({ processedAcc, line })
        }),
        E.chain((ctx) => E.of(ctx.processedAcc))
    )
}

const addSystemNode = (
    node: File | Dir,
    ctx: ProcessingContext
): ProcessingContext => {
    ctx.curDir?.children.push(node)
    node.parent = ctx.curDir
    if (node.type === 'file') {
        const file = node as File
        const fileSize = parseInt(file.size.toString())
        if (ctx.curDir != null) {
            updateFileSize(ctx.curDir, ctx.dirSizes, fileSize)
        }
    } else {
        ctx.dirSizes.set(node.name + node?.id.toString(), 0)
    }
    return ctx
}

const updateFileSize = (
    node: Dir,
    dirSizes: Map<string, number>,
    size: number
): void => {
    const currentSize = dirSizes.get(node.name + node?.id.toString()) ?? 0
    dirSizes.set(node.name + node?.id.toString(), size + currentSize)
    if (node.parent != null) {
        updateFileSize(node.parent, dirSizes, size)
    }
}

const processLs = (cmd: Cmd, ctx: ProcessingContext): ProcessingContext => {
    return ctx
}

const processCd = (cmd: Cmd, ctx: ProcessingContext): ProcessingContext => {
    if (cmd.target === '/') {
        if (ctx.tree[0] != null) {
            const root = ctx.tree[0] as Dir
            ctx.curDir = root
        }
    } else if (cmd.target === '..') {
        if (ctx.curDir != null) {
            ctx.curDir = ctx.curDir.parent
        }
    } else {
        ctx.curDir = ctx.curDir?.children.find((child) => {
            return child.type === 'dir' && child.name === cmd.target
        }) as Dir
    }
    return ctx
}

const parseLine = (line: string): E.Either<Error, LineEntry> =>
    pipe(
        /^\$\s+([^\s]+)\s*(.*)$/.exec(line),
        O.fromNullable,
        O.map<RegExpExecArray, LineEntry>(([, cmdType, target]) => {
            return {
                type: 'cmd',
                cmdType,
                target,
            }
        }),
        O.alt<LineEntry>(() =>
            pipe(
                /^dir\s(.+)$/.exec(line),
                O.fromNullable,
                O.map<RegExpExecArray, LineEntry>(([, name]) => {
                    return {
                        id: Math.floor(Math.random() * 1000),
                        type: 'dir',
                        name,
                        children: [],
                    }
                })
            )
        ),
        O.alt<LineEntry>(() =>
            pipe(
                /^(\d+)\s(.+)$/.exec(line),
                O.fromNullable,
                O.map<RegExpExecArray, LineEntry>(([, size, name]) => {
                    return {
                        id: Math.floor(Math.random() * 1000),
                        type: 'file',
                        name,
                        size,
                    }
                })
            )
        ),
        E.fromOption(() => {
            return new Error(`unknown instruction line: "${line}"`)
        })
    )
