import { JWT_SECRET } from "@repo/backend-common/backend-common";
import jwt from "jsonwebtoken"

export function verify_Auth_Token(token : string){
    try {
        const data = jwt.verify(token , JWT_SECRET);
        return data;
    } catch (error) {
        // console.log(`Invalid Token At WS-Server ${error}`);
        return null
    }
}