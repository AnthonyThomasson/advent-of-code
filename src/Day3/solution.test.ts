import fs from 'fs'
import path from 'path'
import { sumPriorityPartOne } from './solution_part1'
import { sumPriorityPartTwo } from './solution_part2'

describe('Day 3', () => {
    describe('Part One', () => {
        it('If we provide the example input, then we should get the correct result', () =>
            expect(
                sumPriorityPartOne(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(157))
        it('OFFICIAL INPUT', () =>
            expect(
                sumPriorityPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(7742))
    })
    describe('Part Two', () => {
        it('If we provide the example input, then we should get the correct result', () =>
            expect(
                sumPriorityPartTwo(
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(70))
        it('OFFICIAL INPUT', () =>
            expect(
                sumPriorityPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(2276))
    })
})
