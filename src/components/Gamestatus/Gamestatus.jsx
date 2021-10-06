import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { gameStatusStates } from "../../reducers/players";
import Styles from "./Gamestatus.module.css";

const statusMessageMap = {
    [gameStatusStates.PLACING_SHIPS]: "Please Place Your Ships\nRight click to Rotate",
    [gameStatusStates.PLAYER1TURN]: "Player 1 is Attacking",
    [gameStatusStates.PLAYER2TURN]: "Player 2 is Attacking",
    [gameStatusStates.PLAYER1WON]: "Player 1 Won",
    [gameStatusStates.PLAYER2WON]: "Player 2 Won",
}

const Gamestatus = () => {
    let curStatus = useSelector((state)=> state.players.gameStatus);
    let dispatch = useDispatch();
    const handleReset = () => {
        dispatch({type:"RESET_GAME"});
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