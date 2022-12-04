import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import fs from 'fs'
import path from 'path'
import { calculateScorePartOne } from './solution_part1'
import { calculateScorePartTwo } from './solution_part2'

describe('Day 2', () => {
    describe('Part One', () => {
        it('if we provide an invalid input for ourselves, then an error should be returned', () => {
            pipe(
                calculateScorePartOne('A Y\nP X'),
                E.fold(
                    (e) => {
                        expect(e).toEqual(Error('invalid play symbol: X'))
                    },
                    () => {
                        expect(true).toEqual(false)
                    }
                )
            )
        })
        it('if we provide an invalid input for our opponent, then an error should be returned', () => {
            pipe(
                calculateScorePartOne('A Y\nB T'),
                E.fold(
                    (e) => {
                        expect(e).toEqual(Error('invalid play symbol: T'))
                    },
                    () => {
                        expect(true).toEqual(false)
                    }
                )
            )
        })
        it('if we provide the example input, then we should have the correct total score', () =>
            expect(
                pipe(
                    calculateScorePartOne(
                        fs.readFileSync(
                            path.join(__dirname, '/input/example_input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(15))
        it('OFFICIAL INPUT', () =>
            expect(
                pipe(
                    calculateScorePartOne(
                        fs.readFileSync(
                            path.join(__dirname, '/input/input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(11449))
    })
    describe('Part Two', () => {
        it('if we provide an invalid result symbol, then we should return an error', () => {
            pipe(
                calculateScorePartTwo('A Y\nP X'),
                E.fold(
                    (e) => {
                        expect(e).toEqual(Error('invalid play symbol: P'))
                    },
                    () => {
                        expect(true).toEqual(false)
                    }
                )
            )
        })
        it('if we provide the example input, then we should have the correct total score', () =>
            expect(
                pipe(
                    calculateScorePartTwo(
                        fs.readFileSync(
                            path.join(__dirname, '/input/example_input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(12))
        it('OFFICIAL INPUT', () =>
            expect(
                pipe(
                    calculateScorePartTwo(
                        fs.readFileSync(
                            path.join(__dirname, '/input/input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(13187))
    })
})
