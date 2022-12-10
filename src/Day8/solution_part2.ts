import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

export const solutionPartTwo = (input: string): number =>
    pipe(
        input,
        exploreOurLovelyForest,
        E.map((mapOfForest) =>
            mapOfForest
                .map((rowOfTrees, xIndex) =>
                    rowOfTrees
                        .map((tree, yIndex) => {
                            return calculateScenicScore({
                                treePosition: { x: xIndex, y: yIndex },
                                mapOfForest,
                            })
                        })
                        .sort((a, b) => b - a)
                        .slice(0, 1)
                        .reduce((acc, num) => acc + num, 0)
                )
                .sort((a, b) => b - a)
                .slice(0, 1)
                .reduce((acc, num) => acc + num, 0)
        ),
        E.getOrElse(() => 0)
    )

const exploreOurLovelyForest = (
    mapOfOurLovelyForest: string
): E.Either<Error, number[][]> =>
    pipe(
        mapOfOurLovelyForest,
        S.split('\n'),
        ARO.reduce<string, E.Either<Error, number[][]>>(E.of([]), (acc, line) =>
            pipe(
                E.Do,
                E.bind('acc', () => acc),
                E.bind('trees', () =>
                    pipe(
                        line,
                        S.split(''),
                        ARO.reduce<string, E.Either<Error, number[]>>(
                            E.of([]),
                            (acc, tree) =>
                                pipe(
                                    E.Do,
                                    E.bind('acc', () => acc),
                                    E.bind('tree', () =>
                                        pipe(
                                            tree,
                                            E.fromPredicate(
                                                () => /^\d+$/.test(tree),
                                                () =>
                                                    new Error(
                                                        `weird tree: ${tree}`
                                                    )
                                            )
                                        )
                                    ),
                                    E.map(({ acc, tree }) => [
                                        ...acc,
                                        parseInt(tree),
                                    ])
                                )
                        )
                    )
                ),
                E.chain((data) =>
                    pipe(
                        data,
                        E.fromPredicate(
                            () =>
                                data.acc.length === 0 ||
                                data.trees.length === data.acc[0].length,
                            () => new Error('weird map dude')
                        ),
                        E.map(({ acc, trees }) => [...acc, trees])
                    )
                )
            )
        )
    )

const calculateScenicScore = (searchData: {
    readonly treePosition: { x: number; y: number }
    readonly mapOfForest: number[][]
}): number => {
    const targetTreeSize =
        searchData.mapOfForest[searchData.treePosition.y][
            searchData.treePosition.x
        ]

    // west
    let westScore = 0
    for (let index = searchData.treePosition.x - 1; index >= 0; index--) {
        const currentTreeSize =
            searchData.mapOfForest[searchData.treePosition.y][index]
        westScore++
        if (currentTreeSize >= targetTreeSize) {
            break
        }
    }

    // east
    let eastScore = 0
    for (
        let index = searchData.treePosition.x + 1;
        index < searchData.mapOfForest[0].length;
        index++
    ) {
        const currentTreeSize =
            searchData.mapOfForest[searchData.treePosition.y][index]
        eastScore++
        if (currentTreeSize >= targetTreeSize) {
            break
        }
    }

    // south
    let southScore = 0
    for (
        let index = searchData.treePosition.y + 1;
        index < searchData.mapOfForest[0].length;
        index++
    ) {
        const currentTreeSize =
            searchData.mapOfForest[index][searchData.treePosition.x]
        southScore++
        if (currentTreeSize >= targetTreeSize) {
            break
        }
    }

    // north
    let northScore = 0
    for (let index = searchData.treePosition.y - 1; index >= 0; index--) {
        const currentTreeSize =
            searchData.mapOfForest[index][searchData.treePosition.x]
        northScore++
        if (currentTreeSize >= targetTreeSize) {
            break
        }
    }

    return northScore * southScore * eastScore * westScore
}
