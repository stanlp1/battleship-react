const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 4000;
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

const MAX_PLAYERS = 2;
let rooms = new Map();

let getUniqueID = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
}

let userEvents = {
    JOIN_ROOM: 0,
    PLACE_SHIP: 1,
    MAKE_MOVE: 2,
    GAME_OVER: 3,
}

let clientEvents = {
    OPP_PLACED_SHIP: 1,
}


let newShipEvent = (index, length, dir) =>
{
    return {
        event: clientEvents.OPP_PLACED_SHIP,
        index,
        length,
        dir
    };
}
let sendToClient = (clientId, data) =>
{
    wss.clients.forEach((ws) => {
        if (ws.id === clientId){
            if (typeof data === "string")
                ws.send(data);
            else
                ws.send(JSON.stringify(data));
        }
    })
}
wss.on('connection', function connection(ws) {
    ws.id = getUniqueID();
    console.log(ws.id);
    ws.on('message', function incoming(data) {
        let jsonData = JSON.parse(data);
        let event = jsonData.event;
        let payload = jsonData.payload;
        console.log(jsonData);
        switch (event)
        {
            case userEvents.JOIN_ROOM:
            {
                let room = rooms.get(payload.ROOM_NAME);
                if (room !== undefined)
                {
                    if (room.curPlayers < MAX_PLAYERS)
                    {
                        room.curPlayers++;
                        room.pid.push(ws.id);
                        if (room.curPlayers === 2)
                        {
                            sendToClient(room.pid[0], "success");
                            ws.send("success");
                            ws.room = payload.ROOM_NAME;
                        }
                    }
                }
                else {
                    rooms.set(payload.ROOM_NAME, {
                        curPlayers: 1,
                        pid: [ws.id]
                    });
                    ws.room = payload.ROOM_NAME;
                }
                break;
            }
            case userEvents.PLACE_SHIP:
            {
                let oppid = rooms.get(ws.room).pid.find(id => id !== ws.id); // get opponent id
                console.log(oppid);
                sendToClient(oppid, newShipEvent(payload.PLACED_SHIPS.index, payload.PLACED_SHIPS.length, payload.PLACED_SHIPS.dir));
                break;
            }
            default:
        }
    })
})

server.listen(port, function() {
    console.log("Listening");
})