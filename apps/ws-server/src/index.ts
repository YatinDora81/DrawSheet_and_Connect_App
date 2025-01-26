import { WebSocketServer , WebSocket } from "ws";

const wss = new WebSocketServer({port : 3002} , ()=>{
    console.log(`WS Connected Successfully`);
})



wss.on("connection" , (ws : WebSocket , request)=>{
    console.log(request.url?.split("/"));
    
    ws.on("message" , (data)=>{
        
    })

})