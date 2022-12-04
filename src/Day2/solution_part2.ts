import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as ARO from 'fp-ts/lib/ReadonlyNonEmptyArray'
import * as S from 'fp-ts/lib/string'

export const calculateScorePartTwo = (
    rawInput: string
): E.Either<Error, number> =>
    pipe(
        rawInput,
        S.split('\n'),
        ARO.reduce<string, E.Either<Error, number>>(
            E.of(0),
            (totalScore, game) =>
                pipe(
                    E.Do,
                    E.bind('totalScore', () => totalScore),
                    E.bind('gameScore', () =>
                        pipe(
                            game,
                            parseGame,
                            E.chain(
                                ([opponentPlaySymbol, expectedResultSymbol]) =>
                                    pipe(
                                        E.Do,
                                        E.bind('opponentPlay', () =>
                                            pipe(
                                                getOpponentPlay(
                                                    opponentPlaySymbol
                                                ),
                                                E.fromNullable(
                                                    Error(
                                                        `invalid play symbol: ${opponentPlaySymbol}`
                                                    )
                                                )
                                            )
                                        ),
                                        E.bind('myPlay', ({ opponentPlay }) =>
                                            pipe(
                                                getMyPlay(
                                                    opponentPlay,
                                                    expectedResultSymbol
                                                ),
                                                E.fromNullable(
                                                    Error(
                                                        `invalid play symbol: ${expectedResultSymbol}`
                                                    )
                                                )
                                            )
                                        ),
                                        E.map(({ myPlay, opponentPlay }) =>
                                            calculateRoundScore(
                                                myPlay,
                                                opponentPlay
                                            )
                                        )
                                    )
                            )
                        )
                    ),
                    E.chain(({ totalScore, gameScore }) =>
                        E.of(totalScore + gameScore)
                    )
                )
        )
    )

const parseGame = (
    game: string
): E.Either<Error, ARO.ReadonlyNonEmptyArray<string>> => {
    return pipe(
        game,
        S.split(' '),
        E.fromPredicate(
            (game) => game.length === 2,
            () => Error('Invalid input')
        )
    )
}

interface Play {
    type: 'rock' | 'paper' | 'scissors'
    beats: 'rock' | 'paper' | 'scissors'
    loses: 'rock' | 'paper' | 'scissors'
    points: number
    symbol: 'A' | 'B' | 'C'
}
interface RoundResult {
    type: 'win' | 'draw' | 'lose'
    symbol: 'X' | 'Y' | 'Z'
    points: number
}

const win: RoundResult = {
    type: 'win',
    points: 6,
    symbol: 'Z',
}
const draw: RoundResult = {
    type: 'draw',
    points: 3,
    symbol: 'Y',
}
const lose: RoundResult = {
    type: 'lose',
    points: 0,
    symbol: 'X',
}

const rock: Play = {
    type: 'rock',
    beats: 'scissors',
    loses: 'paper',
    points: 1,
    symbol: 'A',
}

const paper: Play = {
    type: 'paper',
    beats: 'rock',
    loses: 'scissors',
    points: 2,
    symbol: 'B',
}

const scissors: Play = {
    type: 'scissors',
    beats: 'paper',
    loses: 'rock',
    points: 3,
    symbol: 'C',
}

const calculateResult = (myPlay: Play, opponentsPlay: Play): RoundResult => {
    if (myPlay.type === opponentsPlay.type) {
        return draw
    }
    if (myPlay.beats === opponentsPlay.type) {
        return win
    }
    return lose
}

const getResultFromSymbol = (symbol: string): RoundResult | undefined => {
    if (symbol === win.symbol) {
        return win
    }
    if (symbol === draw.symbol) {
        return draw
    }
    if (symbol === lose.symbol) {
        return lose
    }
    return undefined
}

const getPlayFromType = (type: 'rock' | 'paper' | 'scissors'): Play => {
    if (type === rock.type) {
        return rock
    }
    if (type === paper.type) {
        return paper
    }
    if (type === scissors.type) {
        return scissors
    }
    throw new Error('Invalid input')
}

const getMyPlay = (opponentsPlay: Play, expectedResultSymbol: string): Play => {
    const expectedResult = getResultFromSymbol(expectedResultSymbol)
    if (expectedResult === undefined) {
        throw new Error('Invalid input')
    }
    if (expectedResult.type === 'draw') {
        return getPlayFromType(opponentsPlay.type)
    }
    if (expectedResult.type === 'win') {
        return getPlayFromType(opponentsPlay.loses)
    }
    return getPlayFromType(opponentsPlay.beats)
}

const getOpponentPlay = (opponentSymbol: string): Play | undefined => {
    if (opponentSymbol === rock.symbol) {
        return rock
    }
    if (opponentSymbol === paper.symbol) {
        return paper
    }
    if (opponentSymbol === scissors.symbol) {
        return scissors
    }
    return undefined
}

const calculateRoundScore = (myPlay: Play, opponentsPlay: Play): number => {
    const result = calculateResult(myPlay, opponentsPlay)
    return result.points + myPlay.points
}
