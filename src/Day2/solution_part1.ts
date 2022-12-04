import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as ARO from 'fp-ts/lib/ReadonlyNonEmptyArray'
import * as S from 'fp-ts/lib/string'

export const calculateScorePartOne = (
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
                            E.chain(([opponentPlaySymbol, myPlaySymbol]) =>
                                pipe(
                                    E.Do,
                                    E.bind('myPlay', () =>
                                        pipe(
                                            getMyPlay(myPlaySymbol),
                                            E.fromNullable(
                                                Error(
                                                    `invalid play symbol: ${myPlaySymbol}`
                                                )
                                            )
                                        )
                                    ),
                                    E.bind('opponentPlay', () =>
                                        pipe(
                                            getOpponentPlay(opponentPlaySymbol),
                                            E.fromNullable(
                                                Error(
                                                    `invalid play symbol: ${myPlaySymbol}`
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
    points: number
    opponentSymbol: 'A' | 'B' | 'C'
    mySymbol: 'Y' | 'X' | 'Z'
}
interface RoundResult {
    type: 'win' | 'draw' | 'lose'
    points: number
}

const win: RoundResult = {
    type: 'win',
    points: 6,
}
const draw: RoundResult = {
    type: 'draw',
    points: 3,
}
const lose: RoundResult = {
    type: 'lose',
    points: 0,
}

const rock: Play = {
    type: 'rock',
    beats: 'scissors',
    points: 1,
    opponentSymbol: 'A',
    mySymbol: 'X',
}

const paper: Play = {
    type: 'paper',
    beats: 'rock',
    points: 2,
    opponentSymbol: 'B',
    mySymbol: 'Y',
}

const scissors: Play = {
    type: 'scissors',
    beats: 'paper',
    points: 3,
    opponentSymbol: 'C',
    mySymbol: 'Z',
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

const getMyPlay = (mySymbol: string): Play | undefined => {
    if (mySymbol === rock.mySymbol) {
        return rock
    }
    if (mySymbol === paper.mySymbol) {
        return paper
    }
    if (mySymbol === scissors.mySymbol) {
        return scissors
    }
    return undefined
}
const getOpponentPlay = (opponentSymbol: string): Play | undefined => {
    if (opponentSymbol === rock.opponentSymbol) {
        return rock
    }
    if (opponentSymbol === paper.opponentSymbol) {
        return paper
    }
    if (opponentSymbol === scissors.opponentSymbol) {
        return scissors
    }
    return undefined
}

const calculateRoundScore = (myPlay: Play, opponentsPlay: Play): number => {
    const result = calculateResult(myPlay, opponentsPlay)
    return result.points + myPlay.points
}
