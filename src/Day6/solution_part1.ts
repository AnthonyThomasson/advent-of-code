export const solutionPartOne = (input: string): number => {
    for (let index = 3; index < input.length; index++) {
        const charMap = new Map<string, boolean>()
        const group = input.slice(index - 3, index + 1)
        for (const c of group) {
            charMap.set(c, true)
        }
        if (charMap.size === 4) {
            return index + 1
        }
    }

    return 0
}
