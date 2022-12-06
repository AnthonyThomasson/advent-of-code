import fs from 'fs'
import path from 'path'
import { solutionPartOne } from './solution_part1'
import { solutionPartTwo } from './solution_part2'

describe('Day 5', () => {
    describe('Part One', () => {
        it('1 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartOne('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7)
        })
        it('2 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartOne('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
        })
        it('3 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartOne('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
        })
        it('4 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartOne('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(
                10
            )
        })
        it('5 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartOne('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartOne(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(1912)
        })
    })
    describe('Part Two', () => {
        it('1 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartTwo('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19)
        })
        it('2 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartTwo('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
        })
        it('3 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartTwo('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
        })
        it('4 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartTwo('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(
                29
            )
        })
        it('5 If we provide the example input, then we should get the correct result', () => {
            expect(solutionPartTwo('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26)
        })
        it('OFFICIAL INPUT', () => {
            expect(
                solutionPartTwo(
                    fs.readFileSync(path.join(__dirname, '/input/input.txt'), {
                        encoding: 'utf8',
                    })
                )
            ).toBe(2122)
        })
    })
})
