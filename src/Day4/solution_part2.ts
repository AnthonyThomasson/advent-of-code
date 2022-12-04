export const findThePairsPartTwo = (input: string): number => {
    const lines = input.split('\n')

    const numPairs = lines.reduce((numPairs: number, line: string) => {
        if (hasOverlappingSections(line)) {
            return numPairs + 1
        }
        return numPairs
    }, 0)
    return numPairs
}

const hasOverlappingSections = (sections: string): boolean => {
    const [firstSection, secondSection] = sections.split(',')

    const [firstSectionStart, firstSectionEnd] = firstSection
        .split('-')
        .map(Number)
    const [secondSectionStart, secondSectionEnd] = secondSection
        .split('-')
        .map(Number)

    // enclosed in the first section
    if (firstSectionEnd < secondSectionStart) {
        return false
    }

    // enclosed in the second section
    if (secondSectionEnd < firstSectionStart) {
        return false
    }

    return true
}
