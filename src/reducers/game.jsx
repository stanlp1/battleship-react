


export const gameStates = {
    MODE_SELECT: 0,
    JOINING_ROOM: 1,
    AWAITING_PLAYER: 2,
    GAME_STARTED: 3,

}

export const modes = {
    ONLINE: "online",
    LOCAL: "player",
    COMPUTER: "computer"
}
let defaultState = {
    state: gameStates.MODE_SELECT,
    mode: modes.ONLINE,
}

let game = (curstate = defaultState, action) =>
{
    switch (action.type)
    {
        case "MODE_SELECTED":
        {
            return {
                ...curstate,
                state: action.payload.mode === modes.ONLINE ? gameStates.JOINING_ROOM : gameStates.GAME_STARTED,
                mode: action.payload.mode,
            }
        }
        case "JOINED_ROOM":
        {
            return {
                ...curstate,
                state: gameStates.AWAITING_PLAYER,
            }
        }
        default:
            return curstate;
    }

}

export default game;