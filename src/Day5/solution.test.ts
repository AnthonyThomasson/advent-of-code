import fs from 'fs'
import path from 'path'
import { solutionPartOne } from './solution_part1'
import { solutionPartTwo } from './solution_part2'

describe('Day 5', () => {
    describe('Part One', () => {
        it('If we provide the example input, then we should get the correct result', () => {
            const stack = new Map()
            stack.set(1, ['Z', 'N'])
            stack.set(2, ['M', 'C', 'D'])
            stack.set(3, ['P'])
            expect(
                solutionPartOne(
                    stack,
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe('CMZ')
        })
        it('OFFICIAL INPUT', () => {
            const stack = new Map()
            stack.set(1, ['V', 'C', 'D', 'R', 'Z', 'G', 'B', 'W'])
            stack.set(2, ['G', 'W', 'F', 'C', 'B', 'S', 'T', 'V'])
            stack.set(3, ['C', 'B', 'S', 'N', 'W'])
            stack.set(4, ['Q', 'G', 'M', 'N', 'J', 'V', 'C', 'P'])
            stack.set(5, ['T', 'S', 'L', 'F', 'D', 'H', 'B'])
            stack.set(6, ['J', 'V', 'T', 'W', 'M', 'N'])
            stack.set(7, ['P', 'F', 'L', 'C', 'S', 'T', 'G'])
            stack.set(8, ['B', 'D', 'Z'])
            stack.set(9, ['M', 'N', 'Z', 'W'])
            expect(
                solutionPartOne(
                    stack,
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe('TBVFVDZPN')
        })
    })
    describe('Part Two', () => {
        it('If we provide the example input, then we should get the correct result', () => {
            const stack = new Map()
            stack.set(1, ['Z', 'N'])
            stack.set(2, ['M', 'C', 'D'])
            stack.set(3, ['P'])
            expect(
                solutionPartTwo(
                    stack,
                    fs.readFileSync(
                        path.join(__dirname, '/input/example_input.txt'),
                        {
                            encoding: 'utf8',
                        }
                    )
                )
            ).toBe('MCD')
        })
        it('OFFICIAL INPUT', () => {
            const stack = new Map()
            stack.set(1, ['V', 'C', 'D', 'R', 'Z', 'G', 'B', 'W'])
            stack.set(2, ['G', 'W', 'F', 'C', 'B', 'S', 'T', 'V'])
            stack.set(3, ['C', 'B', 'S', 'N', 'W'])
            stack.set(4, ['Q', 'G', 'M', 'N', 'J', 'V', 'C', 'P'])
            stack.set(5, ['T', 'S', 'L', 'F', 'D', 'H', 'B'])
            stack.set(6, ['J', 'V', 'T', 'W', 'M', 'N'])
            stack.set(7, ['P', 'F', 'L', 'C', 'S', 'T', 'G'])
            stack.set(8, ['B', 'D', 'Z'])
            stack.set(9, ['M', 'N', 'Z', 'W'])
            expect(
                solutionPartTwo(
                    stack,
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe('VLCWHTDSZ')
        })
    })
})
