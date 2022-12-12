import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'
export const solutionPartTwo = (input: string): string => {
    let monitor = ''

    let X = 1
    const instructions = parseInstructions(input)
    let currentInstruction = instructions.pop()
    for (let cycle = 1; cycle <= 240; cycle++) {
        console.log('Start cycle ', cycle)

        if (currentInstruction !== undefined) {
            if (currentInstruction.cyclesLeft === 0) {
                console.log(
                    `Finished Executing ${
                        currentInstruction?.type ?? ''
                    } value ${currentInstruction?.value ?? ''}`
                )
                X += currentInstruction.value
                currentInstruction = instructions.pop()
                console.log(
                    `Begin Executing ${currentInstruction?.type ?? ''} value ${
                        currentInstruction?.value ?? ''
                    }`
                )
                if (currentInstruction !== undefined) {
                    currentInstruction.cyclesLeft--
                }
            } else {
                currentInstruction.cyclesLeft--
            }
        }

        monitor = drawPixel(X, cycle, monitor)
        console.log(monitor)
    }
    return monitor
}

const drawPixel = (X: number, cycle: number, row: string): string => {
    const position = (cycle % 40) - 1
    console.log('Draw pixle in position ', position)

    if (position === X || position === X + 1 || position === X - 1) {
        row += '#'
    } else {
        row += '.'
    }

    if (cycle % 40 === 0) {
        row += '\n'
    }

    return row
}

interface Instruction {
    type: 'addx' | 'noop'
    value: number
    cyclesLeft: number
}

const parseInstructions = (input: string): Instruction[] =>
    pipe(
        input,
        S.split('\n'),
        ARO.reduce<string, E.Either<Error, Instruction[]>>(
            E.of([]),
            (acc, line) =>
                pipe(
                    E.Do,
                    E.bind('acc', () => acc),
                    E.bind('instruction', () =>
                        pipe(
                            /^addx\s(-?\d+)$/.exec(line),
                            O.fromNullable,
                            O.map<RegExpExecArray, Instruction>(([, value]) => {
                                return {
                                    type: 'addx',
                                    value: parseInt(value),
                                    cyclesLeft: 2,
                                }
                            }),
                            O.alt(() =>
                                pipe(
                                    /^noop$/.exec(line),
                                    O.fromNullable,
                                    O.map<RegExpExecArray, Instruction>(() => {
                                        return {
                                            type: 'noop',
                                            value: 0,
                                            cyclesLeft: 1,
                                        }
                                    })
                                )
                            ),
                            E.fromOption(() => Error('Invalid instruction'))
                        )
                    ),
                    E.map(({ acc, instruction }) => [instruction, ...acc])
                )
        ),
        E.getOrElse(() => [] as Instruction[])
    )
