import Styles from "./ModeSelect.module.css";

import { useDispatch } from "react-redux";
import {modes } from "../../reducers/game";


let ModeSelect = () => {
    let dispatch = useDispatch();

    let handleButtonInput = (e) => {
        dispatch({type: "MODE_SELECTED", payload: { mode: e.target.value}});
    }
    

    return (
        <div className={Styles['mode-container']}>
            <button onClick={handleButtonInput} value={modes.ONLINE}className={Styles['mode-button']}>Online</button>
            <button onClick={handleButtonInput} value={modes.LOCAL} className={Styles['mode-button']}>Local</button>
            <button onClick={handleButtonInput} value={modes.COMPUTER} className={Styles['mode-button']}>Computer</button>
        </div>
    )
}

export default ModeSelect;