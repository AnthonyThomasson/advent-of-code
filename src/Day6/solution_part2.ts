export const solutionPartTwo = (input: string): number => {
    for (let index = 13; index < input.length; index++) {
        const charMap = new Map<string, boolean>()
        const group = input.slice(index - 13, index + 1)
        for (const c of group) {
            charMap.set(c, true)
        }
        if (charMap.size === 14) {
            return index + 1
        }
    }

    return 0
}
