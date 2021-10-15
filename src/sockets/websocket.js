import { store } from "../index.jsx";
import { tileStates } from "../components/Gametile/GameTile";
import { playerStates } from "../reducers/players.jsx";

// const socket = new WebSocket('ws://localhost:4000');

// socket.onmessage = (event) => {
//     let data 
//     try {
//         data = JSON.parse(event.data);
//     }
//     catch (e) {
//         data = event.data;
//     }
    
//     console.log(data);

//     switch (data.event)
//     {

//         case 1:
//         {
//             console.log("Reached");
//             store.dispatch({type: "CHANGE_ADJ_TILES", payload: {dir: data.dir, index: data.index, length: data.length, tileContent:tileStates.occupied, board: "board2", isPlacing: true}});
//             let state = store.getState();
//             if (state.boards['board2ShipIndex'] >= state.boards.shipArray.length)
//             {
//                 store.dispatch({type:"CHANGE_PLAYER_STATE", payload: {player:'player2', state: playerStates.DONE_PLACING}})
//                 state = store.getState()
//                 if (state.players.player1 === state.players.player2 && state.players.player1 === playerStates.DONE_PLACING)
//                 {
//                     store.dispatch({type:"START_GAME"});
//                 }
//             }
//             break;
//         }

//         default:
//     }
// }
// export default socket;