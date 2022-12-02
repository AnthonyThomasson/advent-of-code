import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as ARO from 'fp-ts/lib/ReadonlyArray'
import * as S from 'fp-ts/string'

const parseCalorie = (calorie: string): E.Either<Error, number> =>
    pipe(
        calorie,
        E.fromPredicate(
            (calorie) => /^\d+$/.test(calorie),
            () => Error(`"${calorie}" is not a number`)
        ),
        E.map((calorie) => parseInt(calorie))
    )

const parseCaloriesList = (input: string): E.Either<Error, number> =>
    pipe(
        input,
        S.split('\n'),
        ARO.reduce<string, E.Either<Error, number>>(
            E.of(0),
            (calorieCount, item) =>
                pipe(
                    E.Do,
                    E.bind('totalCount', () => calorieCount),
                    E.bind('item', () => parseCalorie(item)),
                    E.map(({ totalCount, item }) => totalCount + item)
                )
        )
    )

const getOrderedListByCalorieCount = (
    input: string
): E.Either<Error, number[]> =>
    pipe(
        input,
        S.split('\n\n'),
        E.fromPredicate(
            (input) => input.length > 0 && input[0] !== '',
            () => Error('invalid input string')
        ),
        E.chain((input) =>
            pipe(
                input,
                ARO.reduce<string, E.Either<Error, number[]>>(
                    E.of([]),
                    (elves, elfSupplyRaw: string) =>
                        pipe(
                            E.Do,
                            E.bind('elves', () => elves),
                            E.bind('elfSupply', () =>
                                pipe(
                                    parseCaloriesList(elfSupplyRaw),
                                    E.mapLeft(() =>
                                        Error('error parsing elf supply')
                                    )
                                )
                            ),
                            E.map(({ elves, elfSupply }) => [
                                ...elves,
                                elfSupply,
                            ])
                        )
                )
            )
        ),
        E.chain((elves) => E.of(elves.sort((a, b) => b - a)))
    )

export const getMostCaloriesPartOne = (
    input: string
): E.Either<Error, number> =>
    pipe(
        input,
        getOrderedListByCalorieCount,
        E.chain((elves) => E.of(elves[0]))
    )

export const getMostCaloriesPartTwo = (
    input: string
): E.Either<Error, number> =>
    pipe(
        input,
        getOrderedListByCalorieCount,
        E.chain((elves) => E.of(elves.slice(0, 3))),
        E.chain((elves) =>
            E.of(elves.reduce<number>((acc, cur) => acc + cur, 0))
        )
    )
