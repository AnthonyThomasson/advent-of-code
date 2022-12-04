export const sumPriorityPartTwo = (input: string): number => {
    const lines = input.split('\n')

    let bag1: string | undefined
    let bag2: string | undefined
    let bag3: string | undefined

    const sum = lines.reduce((sum: number, bag: string) => {
        if (bag1 === undefined) {
            bag1 = bag
            return sum
        }
        if (bag2 === undefined) {
            bag2 = bag
            return sum
        }
        if (bag3 === undefined) {
            bag3 = bag
        }

        const badge = bag1
            .split('')
            .reduce((commonItem: string, item: string) => {
                if (
                    (bag2?.includes(item) ?? false) &&
                    (bag3?.includes(item) ?? false)
                ) {
                    return item
                }
                return commonItem
            }, '')

        if (badge === '') {
            throw new Error('Group is missing their badge')
        }

        let itemValue = 0
        if (/^[a-z]{1}$/.test(badge)) {
            itemValue = badge.charCodeAt(0) - 96
        }
        if (/^[A-Z]{1}$/.test(badge)) {
            itemValue = badge.charCodeAt(0) - 38
        }

        bag1 = undefined
        bag2 = undefined
        bag3 = undefined

        return sum + itemValue
    }, 0)

    return sum
}
