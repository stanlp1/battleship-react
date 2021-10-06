import Styles from "./Gameboard.module.css"
import { shallowEqual,  useSelector, useDispatch} from 'react-redux'
import GameTile from "../Gametile/GameTile";

export const boardEmptyAtPos = (index, dir, length, board) => {
    for (let i = index; i < index + (dir * length); i+=dir)
    {
        if (board[i] === "B")
            return false;
    }
    return true;
}


const Gameboard = ({playerID, boardNum}) => {
    const dispatch = useDispatch();
    const board = useSelector((state) => Array.from(state.boards[boardNum].keys()), shallowEqual);
    const size = useSelector((state) => state.boards.boardSize);
    console.log("Rendering" + boardNum);

    const handleClick = () => {
        dispatch({type: "CHANGE_SIZE", payload:{size:size+2}});
    }

    return (
        <>
            <div className={Styles['board-container']}>
                {board.map( (index) => <GameTile boardSize={size} boardNum={boardNum} tileIndex={index} key={index}></GameTile>)}
            </div>
        </>
    )
}

export default Gameboard;