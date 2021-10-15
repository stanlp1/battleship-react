export const playerStates = {
    PLACING: 0,
    DONE_PLACING: 1,
    ISATTACKING: 2,
    ISDEFENDING: 3,
    LOST: 4,
    WON: 5
}
export const gameStatusStates = {
    PLACING_SHIPS: 0,
    PLAYER1TURN: 1,
    PLAYER2TURN: 2,
    PLAYER1WON: 3,
    PLAYER2WON: 4,
}
let defaultState = {
    player1: playerStates.PLACING,
    player2: playerStates.PLACING,
    gameStatus : gameStatusStates.PLACING_SHIPS,
    player1Score: 0,
    player2Score: 0,
    playerNum: 1,
}



let players = (state = defaultState, action) => {
    switch(action.type) {
        case 'CHANGE_PLAYER_STATE':
            return {
                ...state,
                [action.payload.player]: action.payload.state,
            }
        case 'SET_ONLINE_PLAYER_NUM':
            return {
                ...state,
                playerNum: action.payload.player,
            }
        case 'START_GAME':
            return {
                ...state,
                player1: state.playerNum === 1 ? playerStates.ISATTACKING : playerStates.ISDEFENDING,
                player2: state.playerNum === 1 ? playerStates.ISDEFENDING : playerStates.ISATTACKING,
                gameStatus: gameStatusStates["PLAYER"+state.playerNum.toString()+"TURN"]
            }
        case 'SWAP_TURNS':
            return {
                ...state,
                player1: state.player2,
                player2: state.player1,
                gameStatus: state.gameStatus === gameStatusStates.PLAYER1TURN ? gameStatusStates.PLAYER2TURN : gameStatusStates.PLAYER1TURN,
            }
        case 'RESET_GAME':
            return {
                ...state,
                player1: defaultState.player1,
                player2: defaultState.player2,
                gameStatus: defaultState.gameStatus,
            }
        case 'GAME_OVER':
            let won = action.payload.player === "player1" ? "player2" : "player1";
            return {
                ...state,
                [won]: playerStates.WON,
                [action.payload.player]: playerStates.LOST,
                [won+'Score']: state[won+'Score'] + 1,
                gameStatus: won === "player1" ? gameStatusStates.PLAYER1WON : gameStatusStates.PLAYER2WON,
            }
        case 'INC_PLAYER_SCORE':
            return {
                ...state,
                [action.payload.player+'Score']: state[action.payload.player+'Score'] + 1,
            }
        default:
            return state;
    }
}

export default players;