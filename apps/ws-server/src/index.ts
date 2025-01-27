import { WebSocketServer , WebSocket } from "ws";
import { sendResponse } from "./utils/sendResponse.js";
import { verify_Auth_Token } from "./utils/verifyAuthToken.js";

const wss = new WebSocketServer({port : 3002} , ()=>{
    console.log(`WS Connected Successfully`);
})



wss.on("connection" , (ws : WebSocket , request)=>{
    const searchParams = new URLSearchParams(request.url?.split("?")[1]);
    const token = searchParams.get("token");
    if(!token || token===null){
        // No Token Present
        // sendResponse()
        ws.send("No Token Present");
        ws.close();
        return;
    }
    const userInfo = verify_Auth_Token(token);
    if(!userInfo){
        // Invalid Token Present
        // sendResponse()
        ws.send("Invalid Token Present");
        ws.close();
        return;
    }


    
    
    ws.on("message" , (data)=>{
        
    })

})