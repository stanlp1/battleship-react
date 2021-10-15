import Styles from "./RoomSelect.module.css"
import {useState} from "react";
import { useDispatch } from "react-redux";

let RoomSelect = ({socket}) => {

    let [roomName, setRoomName] = useState("");
    let dispatch = useDispatch();
    let handleInputChange = (e) => {
        setRoomName(e.target.value);
    }

    console.log(socket);
    let handleFormSubmit = () => {
        socket.current.send(JSON.stringify(
            {
                "event": 0,
                "payload": {
                    "ROOM_NAME": roomName
                }
            }
        ))
        dispatch({type: "JOINED_ROOM"});
    
    }

    return (
        <div className={Styles['input-container']}>
            <h1 className={Styles['title-text']}>Please Enter A Room Name</h1>
            <input onChange={handleInputChange} value={roomName} className={Styles['room-input']} type='text'></input>
            <button onClick={handleFormSubmit} className={Styles['room-button']}>Join Room</button>
        </div>
    )
}

export default RoomSelect;