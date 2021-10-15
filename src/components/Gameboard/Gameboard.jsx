/* eslint-disable react-hooks/exhaustive-deps */
import Styles from "./Gameboard.module.css"
import { shallowEqual,  useSelector, useDispatch} from 'react-redux'
import GameTile from "../Gametile/GameTile";
import { playerStates } from "../../reducers/players";
import { useEffect } from "react";
import ComputerTile from "../Gametile/ComputerTile";
import {modes} from "../../reducers/game"

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

const Gameboard = ({socket, playerID, boardNum, type, oppType}) => {
    const dispatch = useDispatch();
    const board = useSelector((state) => Array.from(state.boards[boardNum].keys()), shallowEqual);
    const hidden = useSelector((state) => state.boards[boardNum+'Hidden']);
    const playerState = useSelector((state) => state.players[playerID]);
    const size = useSelector((state) => state.boards.boardSize);
    console.log("Rendering" + boardNum);


    useEffect(() => 
    {
        if (type === modes.COMPUTER && playerState === playerStates.PLACING)
        {
            dispatch({type: "PLACE_RANDOM", payload: {board: boardNum, player: playerID}});
            dispatch({type: "TOGGLE_BOARD_VIS", payload: {board: boardNum}});
            dispatch({type: "CHANGE_PLAYER_STATE", payload: {player: playerID, state:playerStates.DONE_PLACING}});
        }
    },[playerState])

    let renderTiles = () => {
        if (type === modes.COMPUTER || type === modes.ONLINE)
        {
            return board.map( (index) => <ComputerTile oppType={oppType} type={type} hidden={hidden} player={playerID} playerState={playerState} boardSize={size} boardNum={boardNum} tileIndex={index} key={index}></ComputerTile>);
        }
        else{
            return board.map( (index) => <GameTile socket={socket} oppType={oppType} type={type} hidden={hidden} player={playerID} playerState={playerState} boardSize={size} boardNum={boardNum} tileIndex={index} key={index}></GameTile>);
        }
    }

    return (
        <>
            <div className={Styles['board-container']}>
                {renderTiles()}
            </div>
        </>
    )
}

export default Gameboard;