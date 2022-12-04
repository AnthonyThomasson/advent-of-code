import fs from 'fs'
import path from 'path'
import { findThePairsPartOne } from './solution_part1'
import { findThePairsPartTwo } from './solution_part2'

describe('Day 4', () => {
    describe('Part One', () => {
        it('If we provide the example input, then we should get the correct result', () =>
            expect(
                findThePairsPartOne(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(2))
        it('OFFICIAL INPUT', () =>
            expect(
                findThePairsPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(305))
    })
    describe('Part Two', () => {
        it('If we provide the example input, then we should get the correct result', () =>
            expect(
                findThePairsPartTwo(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(4))
        it('OFFICIAL INPUT', () =>
            expect(
                findThePairsPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(811))
    })
})
