import { useSelector, useDispatch } from "react-redux";
import Styles from "./GameTile.module.css";
import { styleMap, tileStates } from "./GameTile.jsx";
import { boardEmptyAtPos, checkVictory } from "../Gameboard/Gameboard";
import { playerStates } from "../../reducers/players.jsx";
import { store } from "../..";
import { modes } from "../../reducers/game";

let ComputerTile = ({tileIndex, boardNum, boardSize, player, playerState, hidden, type, oppType}) => {
    const tileVal = useSelector((state) => state.boards[boardNum][tileIndex]);
    const dispatch = useDispatch();

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
            let lostPlayer = player === "player1" ? "player2" : "player1";
            dispatch({type:"GAME_OVER", payload: {player:lostPlayer}});
            //dispatch({type:"RESET_GAME"});
        }
        else
        {
            dispatch({type:"SWAP_TURNS"});
        }
    }

    const handleClick = (e)=> {
        let state = store.getState();
        switch (playerState) {
            case playerStates.ISDEFENDING: {
                if (tileVal === tileStates.revealed || tileVal === tileStates.hit)
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
                    if (type === modes.COMPUTER)
                        setTimeout(attackOpponent, 50);
                }
                break;
            }
            default:
                return;
        }
    }

    if (hidden === true && tileVal !== tileStates.revealed && tileVal !== tileStates.hit)
    return (
        <div className={`${Styles.tile} ${styleMap[tileStates.hidden]}`} onClick={handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}></div>
    )


    return (
    <div className={`${Styles.tile} ${styleMap[tileVal]}`} onClick={handleClick} id ={`${tileIndex}`} style={{width: `${100/boardSize}%`, height:`${100/boardSize}%`}}></div>
    )
}

export default ComputerTile;