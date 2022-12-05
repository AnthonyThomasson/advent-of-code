export const solutionPartTwo = (
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
            if (toStack !== undefined && fromStack !== undefined) {
                stack.set(to, [...toStack, ...fromStack?.slice(-num)])
                stack.set(from, fromStack?.slice(0, -num))
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
