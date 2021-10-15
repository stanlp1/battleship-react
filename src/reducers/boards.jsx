import { boardEmptyAtPos } from "../components/Gameboard/Gameboard";
import { tileStates } from "../components/Gametile/GameTile";


let defaultState= {
    board1: Array(64).fill(tileStates.hidden),
    board2: Array(64).fill(tileStates.hidden),
    boardSize: 8,
    shipDir: 8,
    shipArray: [
        {id: "C", length: 5},
        {id: "B", length: 4},
        {id: "D", length: 3},
        {id: "S", length: 3},
        {id: "P", length: 2},
    ],
    board1ShipIndex: 0,
    board2ShipIndex: 0,
    board1Hidden: false,
    board2Hidden: false,
}




let boards = (state = defaultState, action) => {
    // console.log(action);
    switch (action.type) {

        case 'CHANGE_TILE': {
            if (state[action.payload.board][action.payload.index] === action.payload.tileContent)
                return state;
            return {
                ...state,
                [action.payload.board]: state[action.payload.board].map(
                    (tile, i) => i === action.payload.index ? action.payload.tileContent : tile
                )
            }
        }
        case 'CHANGE_SIZE': {
            if (state.boardSize === action.payload.size)
                return state;
            return {
                ...state,
                board1: Array(action.payload.size * action.payload.size).fill(0),
                board2: Array(action.payload.size * action.payload.size).fill(0),
                boardSize: action.payload.size,
            }
        }
        case 'CHANGE_ADJ_TILES': {

            // boundary checking
            let dir = action.payload.dir
            let row1 = parseInt((action.payload.index) / state.boardSize);
            let row2 = parseInt(((action.payload.index) + (dir * (action.payload.length - 1) )) / state.boardSize);

            if (action.payload.index + (dir * (action.payload.length -1)) >= state[action.payload.board].length)
                return state;
            else if (dir === 1 && row1 !== row2)
                return state;


            let newBoard = [...state[action.payload.board]];
            for (let i = action.payload.index; i < action.payload.index + (dir * action.payload.length); i+=dir)
            {
                newBoard[i] = action.payload.tileContent;
            }

            if (action.payload.isPlacing)
            {
                return {
                    ...state,
                    [action.payload.board]: newBoard,
                    [action.payload.board+'ShipIndex']: state[action.payload.board+'ShipIndex'] + 1
                }
            }
            return {
                ...state,
                [action.payload.board]: newBoard
            }
        }
        case 'TOGGLE_DIR': {
            return {
                ...state,
                shipDir: state.shipDir === 1 ? state.boardSize : 1,
            }
        }

        case 'REVEAL_TILE': {
            return {
                ...state,
                [action.payload.board]: state[action.payload.board].map(
                    (tile, i) => i === action.payload.index ? tile === tileStates.occupied ? tileStates.hit : tileStates.revealed : tile
                )
            }
        }

        case 'TOGGLE_BOARD_VIS': {
            return {
                ...state,
                [action.payload.board+'Hidden']: state[action.payload.board+'Hidden'] === true ? false : true,
            }
        }
        case 'HIDE_BOARD': {
            return {
                ...state,
                [action.payload.board+'Hidden']: true
            }
        }
        case 'REVEAL_BOARD': {
            return {
                ...state,
                [action.payload.board+'Hidden']: false
            }
        }
        case 'PLACE_RANDOM': {
            let newBoard = [...state[action.payload.board]];
            let shipIndex = state[action.payload.board+'ShipIndex'];
            while (shipIndex < state.shipArray.length) {
                let shipLength = state.shipArray[shipIndex].length;
                let tileIndex = Math.floor(Math.random() * state.boardSize * state.boardSize);
                let dir = Math.floor(Math.random() * 2);
                dir = dir === 1 ? state.boardSize : 1;
                if (boardEmptyAtPos(tileIndex, dir, shipLength, newBoard))
                {
                    let row1 = parseInt((tileIndex) / state.boardSize);
                    let row2 = parseInt(((tileIndex) + (dir * (shipLength - 1) )) / state.boardSize);
        
                    if (tileIndex + (dir * (shipLength -1)) >= state[action.payload.board].length)
                        continue;
                    else if (dir === 1 && row1 !== row2)
                        continue;

                    for (let i =tileIndex; i < tileIndex + (dir * shipLength); i+=dir)
                    {
                        newBoard[i] = tileStates.occupied;
                    }
                    shipIndex++;
                }
            }
            return {
                ...state,
                [action.payload.board]: newBoard,
            }
        }
        case "RESET_GAME":
            {
                return defaultState;
            }
        default:
            return state;
    }

}

export default boards;
