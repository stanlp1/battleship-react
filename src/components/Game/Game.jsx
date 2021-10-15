import React from "react";
import { useSelector } from "react-redux";
import Gameboard from "../Gameboard/Gameboard";
import Legend from "../Legend/Legend";
import Styles from "./Game.module.css"
import {modes } from "../../reducers/game";

const Game = ({socket}) => {

    let mode = useSelector(state => state.game.mode);

    
    return (
        <div className={Styles['gameboard-container']}>
            <Gameboard socket={socket} playerID="player1" boardNum="board1" type={modes.LOCAL} oppType={mode}></Gameboard>
            <Legend></Legend>
            <Gameboard socket={socket} playerID="player2" oppType={modes.LOCAL} type={mode} boardNum="board2"></Gameboard>
        </div>
    )
}

export default Game;