export const solutionPartOne = (
    stack: Map<number, string[]>,
    moves: string
): string => {
    moves.split('\n').forEach((move) => {
        const result = /^move (\d+) from (\d+) to (\d+)$/.exec(move)
        if (result != null) {
            const num = parseInt(result[1])
            const from = parseInt(result[2])
            const to = parseInt(result[3])

            const fromStack = stack.get(from)
            const toStack = stack.get(to)
            for (let i = 0; i < num; i++) {
                const item = fromStack?.pop()
                if (item !== undefined) {
                    toStack?.push(item)
                }
            }
        }

        console.log(result)
    })

    let result = ''
    stack.forEach((i) => {
        result += i.pop() ?? ''
    })

    return result
}
