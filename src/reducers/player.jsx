export const playerStates = {
    PLACING: 0,
    DONE_PLACING: 1,
    ISATTACKING: 2,
    ISDEFENDING: 3,
    LOST: 4,
    WON: 5
}

let defaultState = {
    player1: playerStates.PLACING,
    player2: playerStates.PLACING,
}


let players = (state = defaultState, action) => {
    switch(action.type) {
        case 'CHANGE_PLAYER_STATE':
            return {
                ...state,
                [action.payload.player]: action.payload.state,
            }
        case 'START_GAME':
            return {
                ...state,
                player1: playerStates.ISATTACKING,
                player2: playerStates.ISDEFENDING,
            }
        case 'SWAP_TURNS':
            return {
                ...state,
                player1: state.player2,
                player2: state.player1,
            }
        case 'RESET_GAME':
            return defaultState;
        default:
            return state;
    }
}

export default players;