/* eslint-disable react-hooks/exhaustive-deps */
import Styles from "./Gameboard.module.css"
import { shallowEqual,  useSelector, useDispatch} from 'react-redux'
import GameTile from "../Gametile/GameTile";
import { playerStates } from "../../reducers/players";
import { useEffect } from "react";

export const boardEmptyAtPos = (index, dir, length, board) => {
    for (let i = index; i < index + (dir * length); i+=dir)
    {
        if (board[i] === "B")
            return false;
    }
    return true;
}

export const checkVictory = (board) => {
    return board.filter((val) => val === "B").length === 0;
}

const Gameboard = ({playerID, boardNum, type, oppType}) => {
    const dispatch = useDispatch();
    const board = useSelector((state) => Array.from(state.boards[boardNum].keys()), shallowEqual);
    const hidden = useSelector((state) => state.boards[boardNum+'Hidden']);
    const playerState = useSelector((state) => state.players[playerID]);
    const size = useSelector((state) => state.boards.boardSize);
    console.log("Rendering" + boardNum);


    useEffect(() => 
    {
        if (type === "computer" && playerState === playerStates.PLACING)
        {
            dispatch({type: "PLACE_RANDOM", payload: {board: boardNum, player: playerID}});
            dispatch({type: "TOGGLE_BOARD_VIS", payload: {board: boardNum}});
            dispatch({type: "CHANGE_PLAYER_STATE", payload: {player: playerID, state:playerStates.DONE_PLACING}});
        }
    },[playerState])

    return (
        <>
            <div className={Styles['board-container']}>
                {board.map( (index) => <GameTile oppType={oppType} type={type} hidden={hidden} player={playerID} playerState={playerState} boardSize={size} boardNum={boardNum} tileIndex={index} key={index}></GameTile>)}
            </div>
        </>
    )
}

export default Gameboard;