import fs from 'fs'
import path from 'path'
import { solutionPartOne } from './solution_part1'
import { solutionPartTwo } from './solution_part2'

describe('Day 8', () => {
    describe('Part One', () => {
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
            ).toBe(21)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(1785)
        })
    })
    describe('Part Two', () => {
        it('If we provide the example input, then we should get the correct result', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(8)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(345168)
        })
    })
})
