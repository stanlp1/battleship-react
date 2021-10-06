import React from "react";
import Styles from "./GameTile.module.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardEmptyAtPos, checkVictory } from "../Gameboard/Gameboard";
import { playerStates } from "../../reducers/player";
import { store } from "../..";



export const tileStates = {
    hidden: "0",
    revealed: "R",
    occupied: "B",
    hovered: "H",
    hit: "X",
}
const GameTile = ({tileIndex, boardNum, boardSize, player, playerState, hidden, type}) => {
    const tileVal = useSelector((state) => state.boards[boardNum][tileIndex]);

    const dispatch = useDispatch();
    // console.log(typeof(tileVal));
    // console.log("Rendering tile" + tileIndex);

    const styleMap = {
        [tileStates.occupied]: Styles['tile-occupied'],
        [tileStates.hidden]: Styles['tile-hidden-free'],
        [tileStates.hovered]: Styles['tile-hover'],
        [tileStates.hit]: Styles['tile-hit'],
        [tileStates.revealed]: Styles['tile-revealed'],
    }

    const attackOpponent = () => {
        let state = store.getState();
        let opp = boardNum === "board1" ? "board2" : "board1";
        let oppBoard = state.boards[opp];
        let availMoves = oppBoard.map((val,ind) => (val === tileStates.hidden || val === tileStates.occupied) ? ind : -1);
        availMoves = availMoves.filter((val) => val !== -1);
        let randIndex = Math.floor(Math.random() * availMoves.length);
        dispatch({type: "REVEAL_TILE", payload: {board: opp, index: availMoves[randIndex]}});
        state = store.getState();
        if (checkVictory(state.boards[opp]))
        {
            alert("player won");
            dispatch({type:"RESET_GAME"});
        }
    }
    const handleClick = (e)=> {
        let state = store.getState();
        switch (playerState) {
            case playerStates.PLACING: {
                let shipIndex = state.boards[boardNum+"ShipIndex"];
                let shipLength = state.boards.shipArray[shipIndex].length
                if (boardEmptyAtPos(tileIndex, state.boards.shipDir, shipLength, state.boards[boardNum]))
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: shipLength, tileContent:tileStates.occupied, board: boardNum, isPlacing: true}});
                state = store.getState();
                if (state.boards[boardNum+"ShipIndex"] >= state.boards.shipArray.length)
                {
                    dispatch({type:"CHANGE_PLAYER_STATE", payload: {player:player, state: playerStates.DONE_PLACING}})
                    state = store.getState()
                    if (state.players.player1 === state.players.player2 && state.players.player1 === playerStates.DONE_PLACING)
                    {
                        dispatch({type:"START_GAME"});
                    }
                }
                break;
            }
            case playerStates.ISDEFENDING: {
                if (tileVal === tileStates.revealed || tileVal === tileStates.hit)
                    return;

                dispatch({type: "REVEAL_TILE", payload: {board: boardNum, index: tileIndex}});
                let state = store.getState()
                if (checkVictory(state.boards[boardNum]))
                {
                    alert("Game Won");
                    dispatch({type:"RESET_GAME"});
                }
                else if (type === "computer")
                    attackOpponent();
                break;
            }
            default:
                return;
        }
    }
    const handleMouseOver = () => {
        let state = store.getState();
        switch (playerState) {
            case playerStates.PLACING:
                let shipIndex = state.boards[boardNum+"ShipIndex"];
                let shipLength = state.boards.shipArray[shipIndex].length
                if (boardEmptyAtPos(tileIndex, state.boards.shipDir, shipLength, state.boards[boardNum]))
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: shipLength, tileContent: tileStates.hovered, board: boardNum, isPlacing: false}});
                break;
            default:
                return;
        }
    }
    const handleMouseLeave = () => {
        let state = store.getState();
        switch (playerState) {
            case playerStates.PLACING:
                let shipIndex = state.boards[boardNum+"ShipIndex"];
                let shipLength = state.boards.shipArray[shipIndex].length
                if (boardEmptyAtPos(tileIndex, state.boards.shipDir, shipLength, state.boards[boardNum]))
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: shipLength, tileContent: tileStates.hidden, board: boardNum, isPlacing: false}});
                break;
            default:
                return;
        }
    }
    const handleRotate = (e) => {
        e.preventDefault();
        handleMouseLeave();
        console.log("Dispatching")
        dispatch({type: "TOGGLE_DIR"});
        handleMouseOver();
    }

    if (hidden === true && tileVal !== tileStates.revealed && tileVal !== tileStates.hit)
        return (
            <div className={`${Styles.tile} ${styleMap[tileStates.hidden]}`} onContextMenu={handleRotate} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick= {handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}>{tileVal}</div>
        )

    return (
        <div className={`${Styles.tile} ${styleMap[tileVal]}`} onContextMenu={handleRotate} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick= {handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}>{tileVal}</div>
    )
}

export default GameTile;