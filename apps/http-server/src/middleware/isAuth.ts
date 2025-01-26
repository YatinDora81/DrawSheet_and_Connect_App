import { NextFunction, Response , Request } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/backend-common";

declare global{
    namespace Express{
        export interface Request{
            user? :  {user_id : string , email : string , name : string , profilePic : string}
        }
    }
}

export const isAuthenticatedUser = (req : Request,res : Response,next : NextFunction)=>{
    try {
        const token = req.cookies["authToken"]
        if(!token){
            res.status(400).json({
                success : false,
                data : "No Token Present",
                message : "No Token Present"
           })
           return
        }

        const decode = jwt.verify(token , JWT_SECRET ) as {user_id : string , email : string , name : string , profilePic : string}
        req.user = decode
        next()

    } catch (error) {
        res.status(400).json({
            success : false,
            data : "UnAuthorized",
            message : "UnAuthorized"
        })

        return ;
    }
}