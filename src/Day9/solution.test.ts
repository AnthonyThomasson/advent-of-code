import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import fs from 'fs'
import path from 'path'
import { moveRope, solutionPartOne } from './solution_part1'
import { moveRopePartTwo, solutionPartTwo } from './solution_part2'

describe('Day 9', () => {
    describe('Part One', () => {
        describe('moveRope', () => {
            it('R 4', () => {
                const data = {
                    instruction: {
                        direction: 'R' as 'U' | 'D' | 'L' | 'R',
                        steps: 4,
                    },
                    ropePosition: {
                        knots: [
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRope,
                    E.getOrElse(() => [
                        {
                            knots: [
                                { x: 0, y: 0 },
                                { x: 0, y: 0 },
                            ],
                        },
                    ])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 1, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 2, y: 0 },
                            { x: 1, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 3, y: 0 },
                            { x: 2, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 4, y: 0 },
                            { x: 3, y: 0 },
                        ],
                    },
                ])
            })
            it('U 4', () => {
                const data = {
                    instruction: {
                        direction: 'U' as 'U' | 'D' | 'L' | 'R',
                        steps: 4,
                    },
                    ropePosition: {
                        knots: [
                            { x: 4, y: 0 },
                            { x: 3, y: 0 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRope,
                    E.getOrElse(() => [
                        {
                            knots: [
                                { x: 0, y: 0 },
                                { x: 0, y: 0 },
                            ],
                        },
                    ])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 4, y: 1 },
                            { x: 3, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 4, y: 2 },
                            { x: 4, y: 1 },
                        ],
                    },
                    {
                        knots: [
                            { x: 4, y: 3 },
                            { x: 4, y: 2 },
                        ],
                    },
                    {
                        knots: [
                            { x: 4, y: 4 },
                            { x: 4, y: 3 },
                        ],
                    },
                ])
            })
            it('L 3', () => {
                const data = {
                    instruction: {
                        direction: 'L' as 'U' | 'D' | 'L' | 'R',
                        steps: 3,
                    },
                    ropePosition: {
                        knots: [
                            { x: 4, y: 4 },
                            { x: 4, y: 3 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRope,
                    E.getOrElse(() => [
                        {
                            knots: [
                                { x: 0, y: 0 },
                                { x: 0, y: 0 },
                            ],
                        },
                    ])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 3, y: 4 },
                            { x: 4, y: 3 },
                        ],
                    },
                    {
                        knots: [
                            { x: 2, y: 4 },
                            { x: 3, y: 4 },
                        ],
                    },
                    {
                        knots: [
                            { x: 1, y: 4 },
                            { x: 2, y: 4 },
                        ],
                    },
                ])
            })
            it('D 1', () => {
                const data = {
                    instruction: {
                        direction: 'D' as 'U' | 'D' | 'L' | 'R',
                        steps: 1,
                    },
                    ropePosition: {
                        knots: [
                            { x: 1, y: 4 },
                            { x: 2, y: 4 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRope,
                    E.getOrElse(() => [
                        {
                            knots: [
                                { x: 0, y: 0 },
                                { x: 0, y: 0 },
                            ],
                        },
                    ])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 1, y: 3 },
                            { x: 2, y: 4 },
                        ],
                    },
                ])
            })
            it('D 1', () => {
                const data = {
                    instruction: {
                        direction: 'D' as 'U' | 'D' | 'L' | 'R',
                        steps: 1,
                    },
                    ropePosition: {
                        knots: [
                            { x: 1, y: 4 },
                            { x: 2, y: 4 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRope,
                    E.getOrElse(() => [
                        {
                            knots: [
                                { x: 0, y: 0 },
                                { x: 0, y: 0 },
                            ],
                        },
                    ])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 1, y: 3 },
                            { x: 2, y: 4 },
                        ],
                    },
                ])
            })
        })
        it('If we provide the example input, then we should get the correct result', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(13)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(5902)
        })
    })
    describe('Part Two', () => {
        describe('moveRope', () => {
            it('R 4', () => {
                const data = {
                    instruction: {
                        direction: 'R' as 'U' | 'D' | 'L' | 'R',
                        steps: 4,
                    },
                    ropePosition: {
                        knots: [
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRopePartTwo,
                    E.getOrElse(() => [{ knots: [{ x: 0, y: 0 }] }])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: 1, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 2, y: 0 },
                            { x: 1, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: 3, y: 0 },
                            { x: 2, y: 0 },
                            { x: 1, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },

                    {
                        knots: [
                            { x: 4, y: 0 },
                            { x: 3, y: 0 },
                            { x: 2, y: 0 },
                            { x: 1, y: 0 },
                        ],
                    },
                ])
            })
            it('L 4 - negative', () => {
                const data = {
                    instruction: {
                        direction: 'L' as 'U' | 'D' | 'L' | 'R',
                        steps: 4,
                    },
                    ropePosition: {
                        knots: [
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                }
                const newPos = pipe(
                    data,
                    moveRopePartTwo,
                    E.getOrElse(() => [{ knots: [{ x: 0, y: 0 }] }])
                )
                expect(newPos).toEqual([
                    {
                        knots: [
                            { x: -1, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: -2, y: 0 },
                            { x: -1, y: 0 },
                            { x: 0, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },
                    {
                        knots: [
                            { x: -3, y: 0 },
                            { x: -2, y: 0 },
                            { x: -1, y: 0 },
                            { x: 0, y: 0 },
                        ],
                    },

                    {
                        knots: [
                            { x: -4, y: 0 },
                            { x: -3, y: 0 },
                            { x: -2, y: 0 },
                            { x: -1, y: 0 },
                        ],
                    },
                ])
            })
        })
        it('If we provide the example input, then we should get the correct result', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(
                        path.join(__dirname, '/input/larger_example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(36)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(2445)
        })
    })
})
