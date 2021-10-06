let defaultState = {
    curPlayer: 1,
}

let players = (state = defaultState, action) => {
    switch(action.type) {
        case 'CHANGE_PLAYER':
            return {
                ...state,
                curPlayer: state.curPlayer === 1 ? 2 : 1,
            }
        default:
            return state;
    }
}

export default players;