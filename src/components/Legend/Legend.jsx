import React from "react";
import Gamestatus from "../Gamestatus/Gamestatus";
import tileStyles from "../Gametile/GameTile.module.css";
import Styles from "./Legend.module.css";

const Legend = () => {

    return (
        <div className={Styles['legend-container']}>
            <div className={Styles['legend-entry']}>
                <div className={`${Styles['legend-tile']} ${tileStyles.tile} ${tileStyles['tile-hidden-free']}`} id='legend'></div>
                <span className={Styles['legend-text']}>Hidden Tile</span>
            </div>  
            <div className={Styles['legend-entry']}>
                <div className={`${Styles['legend-tile']} ${tileStyles.tile} ${tileStyles['tile-revealed']}`} id='legend'></div>
                <span className={Styles['legend-text']}>Miss</span>
            </div>  
            <div className={Styles['legend-entry']}>
                <div className={`${Styles['legend-tile']} ${tileStyles.tile} ${tileStyles['tile-hit']}`} id='legend'></div>
                <span className={Styles['legend-text']}>Hit</span>
            </div>  
            <Gamestatus></Gamestatus>
        </div>
    )
}

export default Legend;