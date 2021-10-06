import React from "react";
import Styles from "./GameTile.module.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardEmptyAtPos } from "../Gameboard/Gameboard";
import { store } from "../..";

const GameTile = ({tileIndex, boardNum, boardSize}) => {
    const tileVal = useSelector((state) => state.boards[boardNum][tileIndex]);
    const dispatch = useDispatch();
    // console.log(typeof(tileVal));
    // console.log("Rendering tile" + tileIndex);
    const handleClick = (e)=> {
        let state = store.getState();
        if (boardEmptyAtPos(tileIndex, state.boards.shipDir, 3, state.boards[boardNum]))
            dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: 3, tileContent:"B", board: boardNum}});

    }

    const handleMouseOver = () => {
        let state = store.getState();
        if (boardEmptyAtPos(tileIndex, state.boards.shipDir, 3, state.boards[boardNum]))
            dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: 3, tileContent:"H", board: boardNum}});
    }
    const handleMouseLeave = () => {
        let state = store.getState();
        if (boardEmptyAtPos(tileIndex, state.boards.shipDir, 3, state.boards[boardNum]))
            dispatch({type: "CHANGE_ADJ_TILES", payload: {index: tileIndex, length: 3, tileContent:"0", board: boardNum}});
    }
    const styleMap = {
        "B": Styles['tile-occupied'],
        "0": Styles['tile-hidden-free'],
        "H": Styles['tile-hover'],
    }

    return (
        <div className={`${Styles.tile} ${styleMap[tileVal]}`} onMouseLeave={handleMouseLeave} onMouseOver={handleMouseOver} onClick= {handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}>{tileVal}</div>
    )
}

export default GameTile;