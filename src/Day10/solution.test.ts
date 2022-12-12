import fs from 'fs'
import path from 'path'
import { solutionPartOne } from './solution_part1'
import { solutionPartTwo } from './solution_part2'

describe('Day 10', () => {
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
            ).toBe(-720)
        })
        it('If we provide the larger example input, then we should get the correct result', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(
                        path.join(__dirname, '/input/larger_example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe(13140)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(14040)
        })
    })
    describe('Part Two', () => {
        it('If we provide the example input, then we should get the correct result', () => {
            const result = solutionPartTwo(
                fs.readFileSync(
                    path.join(__dirname, '/input/larger_example_input.txt'),
                    {
                        encoding: 'utf8',
                    }
                )
            )

            expect(result).toBe(
                `##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......###.\n#######.......#######.......#######.....\n`
            )
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(
                `####..##...##....##.####...##.####.#....\n...#.#..#.#..#....#....#....#.#....#....\n..#..#....#.......#...#.....#.###..#....\n.#...#.##.#.......#..#......#.#....#....\n#....#..#.#..#.#..#.#....#..#.#....#....\n####..###..##...##..####..##..#....####.\n`
            )
        })
    })
})
