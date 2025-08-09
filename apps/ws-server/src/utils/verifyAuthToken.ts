import { JWT_SECRET } from "@repo/backend-common/backend-common";
import jwt from "jsonwebtoken"
import { WebSocket  }  from "ws";
import { User } from "./UserManager.js";
import { sendErrorResponse } from "./sendResponse.js";

export function verify_Auth_Token(token : string){
    try {
        const data = jwt.verify(token , JWT_SECRET);
        return data;
    } catch (error) {
        // console.log(`Invalid Token At WS-Server ${error}`);
        return null
    }
}


export function isUserVerified(ws : WebSocket , request : any){
    const searchParams = new URLSearchParams(request.url?.split("?")[1]);
    const token = searchParams.get("token");
    if(!token || token===null){
        // No Token Present
        sendErrorResponse(ws, "No Auth Token Present!!!" , "No Auth Token Present!!!")
        return null;
    }
    const userInfo : any = verify_Auth_Token(token);
    if(!userInfo){
        // Invalid Token Present
        // sendResponse()
        sendErrorResponse(ws, "Invalid Auth Token!!!" , "Invalid Auth Token!!!")
        
        return null;
    }
    

    const user : User = {
        user_id: userInfo.user_id,
        name : userInfo.name,
        email : userInfo.email,
        profilePic : userInfo.profilePic,
        socket :ws
    }
    
    return user;
}