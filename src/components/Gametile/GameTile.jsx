import React from "react";
import Styles from "./GameTile.module.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardEmptyAtPos, checkVictory } from "../Gameboard/Gameboard";
import { playerStates } from "../../reducers/players";
import { store } from "../..";
import { modes } from "../../reducers/game";


export const tileStates = {
    hidden: "0",
    revealed: "R",
    occupied: "B",
    hovered: "H",
    hit: "X",
}

export const styleMap = {
    [tileStates.occupied]: Styles['tile-occupied'],
    [tileStates.hidden]: Styles['tile-hidden-free'],
    [tileStates.hovered]: Styles['tile-hover'],
    [tileStates.hit]: Styles['tile-hit'],
    [tileStates.revealed]: Styles['tile-revealed'],
}

const GameTile = ({socket, tileIndex, boardNum, boardSize, player, playerState, hidden, type, oppType}) => {
    const tileVal = useSelector((state) => state.boards[boardNum][tileIndex]);

    const dispatch = useDispatch();

    const handleClick = (e)=> {
        let state = store.getState();
        switch (playerState) {
            case playerStates.PLACING: {
                let shipIndex = state.boards[boardNum+"ShipIndex"];
                let shipLength = state.boards.shipArray[shipIndex].length
                if (boardEmptyAtPos(tileIndex, state.boards.shipDir, shipLength, state.boards[boardNum]))
                {
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {dir: state.boards.shipDir, index: tileIndex, length: shipLength, tileContent:tileStates.occupied, board: boardNum, isPlacing: true}});
                    if (oppType === modes.ONLINE)
                    {
                        socket.current.send(JSON.stringify({
                            "event": 1,
                            "payload": {
                                "ROOM_NAME": "test",
                                "PLACED_SHIPS": {
                                    "index": tileIndex,
                                    "dir": state.boards.shipDir,
                                    "length": shipLength
                                }
                            }
                        }));
                    }
                }
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
                if (tileVal === tileStates.revealed || tileVal === tileStates.hit || oppType === 'computer')
                    return;

                dispatch({type: "REVEAL_TILE", payload: {board: boardNum, index: tileIndex}});
                let state = store.getState()
                if (checkVictory(state.boards[boardNum]))
                {
                    dispatch({type:"GAME_OVER", payload: {player:player}});
                    //dispatch({type:"RESET_GAME"});
                }
                else 
                {
                    dispatch({type:"SWAP_TURNS"});
                }
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
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {dir: state.boards.shipDir, index: tileIndex, length: shipLength, tileContent: tileStates.hovered, board: boardNum, isPlacing: false}});
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
                    dispatch({type: "CHANGE_ADJ_TILES", payload: {dir: state.boards.shipDir, index: tileIndex, length: shipLength, tileContent: tileStates.hidden, board: boardNum, isPlacing: false}});
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
            <div className={`${Styles.tile} ${styleMap[tileStates.hidden]}`} onContextMenu={handleRotate} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick= {handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}></div>
        )

    return (
        <div className={`${Styles.tile} ${styleMap[tileVal]}`} onContextMenu={handleRotate} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick= {handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}></div>
    )
}

export default GameTile;