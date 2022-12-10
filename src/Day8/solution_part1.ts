import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import * as ARO from 'fp-ts/ReadonlyArray'
import * as S from 'fp-ts/string'

export const solutionPartOne = (input: string): number =>
    pipe(
        input,
        exploreOurLovelyForest,
        E.map((mapOfForest) =>
            mapOfForest
                .map((rowOfTrees, xIndex) =>
                    rowOfTrees
                        .map((_, yIndex) =>
                            canISeeThisTree({
                                treePosition: { x: xIndex, y: yIndex },
                                mapOfForest,
                            })
                        )
                        .reduce((acc, canISeeThisTree) => {
                            if (canISeeThisTree) {
                                return acc + 1
                            } else {
                                return acc
                            }
                        }, 0)
                )
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

const canISeeThisTree = (searchData: {
    readonly treePosition: { x: number; y: number }
    readonly mapOfForest: number[][]
}): boolean => {
    if (
        searchData.treePosition.x ===
            searchData.mapOfForest[searchData.treePosition.y].length - 1 ||
        searchData.treePosition.x === 0
    ) {
        return true
    }

    if (
        searchData.treePosition.y === searchData.mapOfForest.length - 1 ||
        searchData.treePosition.y === 0
    ) {
        return true
    }

    const targetTreeSize =
        searchData.mapOfForest[searchData.treePosition.y][
            searchData.treePosition.x
        ]

    // west
    let isVisible = true
    for (let index = searchData.treePosition.x - 1; index >= 0; index--) {
        const currentTreeSize =
            searchData.mapOfForest[searchData.treePosition.y][index]
        if (currentTreeSize >= targetTreeSize) {
            isVisible = false
            break
        }
    }
    if (isVisible) {
        return true
    }

    // east
    isVisible = true
    for (
        let index = searchData.treePosition.x + 1;
        index < searchData.mapOfForest[0].length;
        index++
    ) {
        const currentTreeSize =
            searchData.mapOfForest[searchData.treePosition.y][index]
        if (currentTreeSize >= targetTreeSize) {
            isVisible = false
            break
        }
    }
    if (isVisible) {
        return true
    }

    // south
    isVisible = true
    for (
        let index = searchData.treePosition.y + 1;
        index < searchData.mapOfForest[0].length;
        index++
    ) {
        const currentTreeSize =
            searchData.mapOfForest[index][searchData.treePosition.x]
        if (currentTreeSize >= targetTreeSize) {
            isVisible = false
            break
        }
    }
    if (isVisible) {
        return true
    }

    // north
    isVisible = true
    for (let index = searchData.treePosition.y - 1; index >= 0; index--) {
        const currentTreeSize =
            searchData.mapOfForest[index][searchData.treePosition.x]
        if (currentTreeSize >= targetTreeSize) {
            isVisible = false
            break
        }
    }
    if (isVisible) {
        return true
    }

    return false
}
