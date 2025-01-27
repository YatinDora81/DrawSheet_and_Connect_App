import { WebSocket } from "ws";

export function sendResponse( ws : WebSocket , success : boolean , type : string , data : any , message : string ){
    ws.send(JSON.stringify({
        success,
        type,
        data,
        message
    }))
}