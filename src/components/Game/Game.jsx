import React from "react";
import Gameboard from "../Gameboard/Gameboard";
import Legend from "../Legend/Legend";
import Styles from "./Game.module.css"

const Game = () => {

    return (
        <div className={Styles['gameboard-container']}>
            <Gameboard playerID="player1" boardNum="board1" oppType="computer"></Gameboard>
            <Legend></Legend>
            <Gameboard playerID="player2" oppType="player" type="computer" boardNum="board2"></Gameboard>
        </div>
    )
}

export default Game;