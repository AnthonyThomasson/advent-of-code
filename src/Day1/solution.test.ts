import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import fs from 'fs'
import path from 'path'

import { getMostCaloriesPartOne, getMostCaloriesPartTwo } from './solution'

describe('Day 1', () => {
    describe('Part One', () => {
        it('When no input is provided, then an error is returned', () =>
            pipe(
                getMostCaloriesPartOne(''),
                E.fold(
                    (error) => {
                        expect(error.message).toBe('invalid input string')
                    },
                    (result) => {
                        expect(true).toBe(false)
                    }
                )
            ))
        it('When only new lines are provided, then an error is returned', () =>
            pipe(
                getMostCaloriesPartOne('\n\n\n\n'),
                E.fold(
                    (error) => {
                        expect(error.message).toBe('invalid input string')
                    },
                    (result) => {
                        expect(true).toBe(false)
                    }
                )
            ))
        it('When an incorrect calorie format is provided, then errors are returned for each format issue', () =>
            pipe(
                getMostCaloriesPartOne(
                    fs.readFileSync(
                        path.join(__dirname, '/input/error_example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                ),
                E.fold(
                    (error) => {
                        expect(error.message).toBe('error parsing elf supply')
                    },
                    (result) => {
                        expect(true).toBe(false)
                    }
                )
            ))
        it('Should count all the calories of the elves, then return the highest calorie count', () =>
            expect(
                pipe(
                    getMostCaloriesPartOne(
                        fs.readFileSync(
                            path.join(__dirname, '/input/example_input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(24000))
        it('OFFICIAL INPUT', () =>
            expect(
                pipe(
                    getMostCaloriesPartOne(
                        fs.readFileSync(
                            path.join(__dirname, '/input/input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toBe(64929))
    })
    describe('Part Two', () => {
        it('Should count all the calories of the elves, then return the calorie count of the top 3 elves', () =>
            expect(
                pipe(
                    getMostCaloriesPartTwo(
                        fs.readFileSync(
                            path.join(__dirname, '/input/example_input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toEqual(45000))
        it('OFFICIAL INPUT', () =>
            expect(
                pipe(
                    getMostCaloriesPartTwo(
                        fs.readFileSync(
                            path.join(__dirname, '/input/input.txt'),
                            {
                                encoding: 'utf8',
                            }
                        )
                    ),
                    E.getOrElse(() => 0)
                )
            ).toEqual(193697))
    })
})
