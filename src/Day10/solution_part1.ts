import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

export const solutionPartOne = (input: string): number => {
    const signalStrengths = []
    let X = 1
    const Ψave = 20
    const instructions = parseInstructions(input)
    let currentInstruction = instructions.pop()
    for (let cycle = 1; cycle <= Ψave + 40 * 5; cycle++) {
        if (currentInstruction !== undefined) {
            if (currentInstruction.cyclesLeft === 0) {
                X += currentInstruction.value
                currentInstruction = instructions.pop()
                if (currentInstruction !== undefined) {
                    currentInstruction.cyclesLeft--
                }
            } else {
                currentInstruction.cyclesLeft--
            }
        }

        if (cycle === Ψave || (cycle - Ψave) % 40 === 0) {
            signalStrengths.push(cycle * X)
        }
    }
    return signalStrengths.reduce((acc, x) => acc + x, 0)
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
