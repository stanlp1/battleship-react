import React from "react";
import Styles from "./Header.module.css"
const Header = () => {
    return (
        <header>
            <h1 className={Styles['title-text']}>Battleship</h1>
        </header>
    )
}

export default Header;