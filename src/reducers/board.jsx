

let defaultState= {
    board1: Array(64).fill(0),
    board2: Array(64).fill(0),
    boardSize: 8,
    shipDir: 8,
}





let boards = (state = defaultState, action) => {
    console.log(action);
    switch (action.type) {

        case 'CHANGE_TILE':
            if (state[action.payload.board][action.payload.index] === action.payload.tileContent)
                return state;
            return {
                ...state,
                [action.payload.board]: state[action.payload.board].map(
                    (tile, i) => i === action.payload.index ? action.payload.tileContent : tile
                )
            }
        case 'CHANGE_SIZE':
            if (state.boardSize === action.payload.size)
                return state;
            return {
                ...state,
                board1: Array(action.payload.size * action.payload.size).fill(0),
                board2: Array(action.payload.size * action.payload.size).fill(0),
                boardSize: action.payload.size,
            }
        case 'CHANGE_ADJ_TILES':
            let dir = state.shipDir;
            if (action.payload.index + (dir * (action.payload.length -1)) >= state[action.payload.board].length)
                return state;
            let newBoard = [...state[action.payload.board]];

            for (let i = action.payload.index; i < action.payload.index + (dir * action.payload.length); i+=dir)
            {
                newBoard[i] = action.payload.tileContent;
            }
            return {
                ...state,
                [action.payload.board]: newBoard
            }
        case 'TOGGLE_DIR':
            return {
                ...state,
                shipDir: state.shipDir === 1 ? state.boardSize : 1,
            }
        default:
            return state;
    }

}

export default boards;
