import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

interface RopeMovement {
    currentPosition: RopePosition
    visitedPositions: Map<string, boolean>
}

interface Instruction {
    direction: 'U' | 'D' | 'L' | 'R'
    steps: number
}

export interface RopePosition {
    knots: Position[]
}

interface Position {
    x: number
    y: number
}

export const solutionPartOne = (input: string): number => {
    const movement: RopeMovement = {
        currentPosition: {
            knots: [
                { x: 0, y: 0 },
                { x: 0, y: 0 },
            ],
        },
        visitedPositions: new Map<string, boolean>(),
    }

    return pipe(
        input,
        S.split('\n'),
        ARO.reduce<string, Map<string, boolean>>(
            new Map<string, boolean>(),
            (visitedPositions, instruction) =>
                pipe(
                    E.Do,
                    E.bind('instruction', () =>
                        pipe(instruction, parseInstruction)
                    ),
                    E.bind('ropePosition', () =>
                        E.of(movement.currentPosition)
                    ),
                    E.reduce<
                        {
                            readonly instruction: Instruction
                            readonly ropePosition: RopePosition
                        },
                        E.Either<Error, RopePosition[]>
                    >(
                        E.left(Error('Unable to resolve a position')),
                        (acc, cur) => moveRope(cur)
                    ),
                    E.map((ropePositions) => {
                        movement.currentPosition = pipe(
                            ropePositions,
                            ARO.last,
                            O.getOrElse(() => movement.currentPosition)
                        )
                        ropePositions.forEach((ropePosition) => {
                            const tail = pipe(
                                ropePosition.knots,
                                ARO.last,
                                O.getOrElse(() => {
                                    return { x: 0, y: 0 }
                                })
                            )
                            movement.visitedPositions.set(
                                `${tail.x}-${tail.y}`,
                                true
                            )
                        })
                        return movement.visitedPositions
                    }),
                    E.getOrElse(() => visitedPositions)
                )
        ),
        (positions) => positions.size
    )
}

const parseInstruction = (instruction: string): E.Either<Error, Instruction> =>
    pipe(
        /^([RLUD]{1})\s(\d+)$/.exec(instruction),
        E.fromPredicate(
            (matches) =>
                matches?.[1] !== undefined && matches?.[2] !== undefined,
            () => new Error(`Unable to parse instruction: ${instruction}`)
        ),
        E.map((matches) => {
            const i: Instruction = {
                direction: matches?.[1] as 'U' | 'D' | 'L' | 'R',
                steps: parseInt(matches?.[2] ?? '0'),
            }
            return i
        })
    )

export const moveRope = (d: {
    readonly instruction: Instruction
    readonly ropePosition: RopePosition
}): E.Either<Error, RopePosition[]> => {
    const positions: RopePosition[] = []

    let currKnots: Position[] = [...d.ropePosition.knots]

    for (let step = 0; step < d.instruction.steps; step++) {
        const newKnots: Position[] = [...currKnots.map((k) => ({ ...k }))]
        const head = newKnots[0]
        switch (d.instruction.direction) {
            case 'U':
                head.y++
                break
            case 'D':
                head.y--
                break
            case 'R':
                head.x++
                break
            case 'L':
                head.x--
                break
            default:
                break
        }
        let lastKnot = head
        for (let index = 1; index < newKnots.length; index++) {
            const currKnot = newKnots[index]
            const distance = Math.max(
                Math.abs(currKnot.x - lastKnot.x),
                Math.abs(currKnot.y - lastKnot.y)
            )
            if (distance > 1) {
                const directionX = lastKnot.x - currKnot.x
                currKnot.x +=
                    Math.abs(directionX) === 2 ? directionX / 2 : directionX
                const directionY = lastKnot.y - currKnot.y
                currKnot.y +=
                    Math.abs(directionY) === 2 ? directionY / 2 : directionY
            }
            lastKnot = currKnot
        }
        positions.push({ knots: [...newKnots] })
        currKnots = newKnots
    }

    return E.of(positions)
}
