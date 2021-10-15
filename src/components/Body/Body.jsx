import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Game from "../Game/Game";
import { gameStates } from "../../reducers/game";
import RoomSelect from "../RoomSelect/RoomSelect";
import ModeSelect from "../ModeSelect/ModeSelect";
import { playerStates } from "../../reducers/players";
import { tileStates } from "../Gametile/GameTile";
import { store } from "../..";
import { checkVictory } from "../Gameboard/Gameboard";

const Body = () => {
    const gameState = useSelector(state=> state.game.state);
    const socket = useRef(null);

    useEffect(() => 
    {
        if(gameState === gameStates.JOINING_ROOM) // open socket if game is online
        {
            socket.current = new WebSocket('ws://localhost:4000');

            socket.current.onmessage = (event) => {
                let data 
                try {
                    data = JSON.parse(event.data);
                }
                catch (e) {
                    data = event.data;
                }
                
                console.log(data);
            
                switch (data.event)
                {
                    case 'ROOM_JOIN_SUCCESS':
                    {

                        store.dispatch({type: "SET_ONLINE_PLAYER_NUM", payload: { player: data.payload.player }});
                        console.log("SET ROOM");
                        break;
                    }
                    case 1: // oppponent ship place event
                    {
                        console.log("Reached");
                        store.dispatch({type: "CHANGE_ADJ_TILES", payload: {dir: data.dir, index: data.index, length: data.length, tileContent:tileStates.occupied, board: "board2", isPlacing: true}});
                        let state = store.getState();
                        if (state.boards['board2ShipIndex'] >= state.boards.shipArray.length)
                        {
                            store.dispatch({type:"CHANGE_PLAYER_STATE", payload: {player:'player2', state: playerStates.DONE_PLACING}})
                            state = store.getState()
                            if (state.players.player1 === state.players.player2 && state.players.player1 === playerStates.DONE_PLACING)
                            {
                                store.dispatch({type:"START_GAME"});
                            }
                        }
                        break;
                    }
                    case 2: // oppoonent attack event
                    {
                        console.log("Received Attack");
                        store.dispatch({type: "REVEAL_TILE", payload: {board: "board1", index: data.index}});
                        let state = store.getState()
                        if (checkVictory(state.boards["board1"]))
                        {
                            store.dispatch({type:"GAME_OVER", payload: {player:"player1"}});
                            store.dispatch({type: "REVEAL_BOARD", payload: {board: "board2"}}); // reveal board when victory
                        }
                        else 
                        {
                            store.dispatch({type:"SWAP_TURNS"});
                        }
                        break;
                    }
                    case 3: // new game event
                    {
                        console.log("Received New Game Event");
                        store.dispatch({type:"RESET_GAME"});
                    }
            
                    default:
                }
            }
        }
    }, [gameState])

    const stateMap = {
        [gameStates.MODE_SELECT]: <ModeSelect></ModeSelect>,
        [gameStates.JOINING_ROOM]: <RoomSelect socket={socket}></RoomSelect>,
        [gameStates.AWAITING_PLAYER]: <Game socket={socket}></Game>,
        [gameStates.GAME_STARTED]: <Game socket={socket}></Game>
    }
    return (
        stateMap[gameState]
    )
}

export default Body;