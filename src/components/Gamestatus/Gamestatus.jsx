import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { gameStatusStates } from "../../reducers/players";
import Styles from "./Gamestatus.module.css";
import { modes } from "../../reducers/game";

const statusMessageMap = {
    [gameStatusStates.PLACING_SHIPS]: "Please Place Your Ships\nRight click to Rotate",
    [gameStatusStates.PLAYER1TURN]: "You are Attacking",
    [gameStatusStates.PLAYER2TURN]: "Your Opponent is Attacking",
    [gameStatusStates.PLAYER1WON]: "You Won",
    [gameStatusStates.PLAYER2WON]: "Your Opponent Won",
}

const Gamestatus = ({socket}) => {
    let curStatus = useSelector((state)=> state.players.gameStatus);
    let gameMode = useSelector((state)=>state.game.mode);
    let dispatch = useDispatch();
    const handleReset = () => {
        dispatch({type:"RESET_GAME"});
        if (gameMode === modes.ONLINE)
        {
            socket.current.send(JSON.stringify(
                {
                    "event": 4,
                }
            ));
        }
    }

    return (
        <div className={Styles['status-contaienr']}>
            <span className={Styles['game-status']} >{statusMessageMap[curStatus]}</span>
            {(curStatus === gameStatusStates.PLAYER1WON || curStatus === gameStatusStates.PLAYER2WON) && 
            <button className={Styles['reset-button']} onClick={handleReset}>New Game</button>}
        </div>
    )

}

export default Gamestatus;