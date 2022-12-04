const hasOverlappingSections = (sections: string): boolean => {
    const [firstSection, secondSection] = sections.split(',')

    const [firstSectionStart, firstSectionEnd] = firstSection
        .split('-')
        .map(Number)
    const [secondSectionStart, secondSectionEnd] = secondSection
        .split('-')
        .map(Number)

    // enclosed in the first section
    if (
        firstSectionStart <= secondSectionStart &&
        firstSectionEnd >= secondSectionEnd
    ) {
        return true
    }

    // enclosed in the second section
    if (
        secondSectionStart <= firstSectionStart &&
        secondSectionEnd >= firstSectionEnd
    ) {
        return true
    }

    return false
}

export const findThePairsPartOne = (input: string): number => {
    const lines = input.split('\n')

    const numPairs = lines.reduce((numPairs: number, line: string) => {
        if (hasOverlappingSections(line)) {
            return numPairs + 1
        }
        return numPairs
    }, 0)
    return numPairs
}
