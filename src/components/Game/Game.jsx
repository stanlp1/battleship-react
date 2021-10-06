import React from "react";
import Gameboard from "../Gameboard/Gameboard";
import Styles from "./Game.module.css"

const Game = () => {

    return (
        <div className={Styles['gameboard-container']}>
            <Gameboard playerID="player1" boardNum="board1"></Gameboard>
            <Gameboard playerID="player2" type="computer" boardNum="board2"></Gameboard>
        </div>
    )
}

export default Game;