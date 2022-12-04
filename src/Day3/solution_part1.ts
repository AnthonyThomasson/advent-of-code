const getBagCompartments = (bag: string): string[] => {
    if (bag.length % 2 !== 0) {
        throw new Error('You got a weird bag there buddy')
    }
    return [bag.substring(0, bag.length / 2), bag.substring(bag.length / 2)]
}

export const sumPriorityPartOne = (input: string): number => {
    const lines = input.split('\n')
    const sum = lines.reduce((sum, bag) => {
        const [compartmentOne, compartmentTwo] = getBagCompartments(bag)
        const commonItem = compartmentOne
            .split('')
            .reduce((commonItem: string, item: string) => {
                if (compartmentTwo.includes(item)) {
                    return item
                }
                return commonItem
            }, '')

        if (/^[a-z]{1}$/.test(commonItem)) {
            const itemValue = commonItem.charCodeAt(0) - 96
            return sum + itemValue
        }
        if (/^[A-Z]{1}$/.test(commonItem)) {
            const itemValue = commonItem.charCodeAt(0) - 38
            return sum + itemValue
        }

        return sum
    }, 0)
    return sum
}
