import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/backend-common";
import multiavatar from '@multiavatar/multiavatar'

declare global {
    namespace Express {
        export interface Request {
            user?: { user_id: string, email: string, name: string, profilePic: string }
        }
    }
}

let Avatars_Cache: string[] | null = null

export const isAuthenticatedUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Prioritize Bearer token from Authorization header
        const headerToken = req.headers["authorization"]
        const bearerToken = headerToken?.split(" ")[1]
        
        // Fallback to cookie for backward compatibility
        const cookieToken = req.cookies["authToken"]
        
        const token = bearerToken || cookieToken
        
        if (!token) {
            res.status(401).json({
                success: false,
                data: "No Token Present - Please provide Authorization header with Bearer token",
                message: "No Token Present"
            })
            return
        }

        const decode = jwt.verify(token, JWT_SECRET) as { user_id: string, email: string, name: string, profilePic: string }
        req.user = decode
        next()

    } catch (error) {
        res.status(400).json({
            success: false,
            data: "UnAuthorized",
            message: "UnAuthorized"
        })

        return;
    }
}

export const    get_all_avatars = (req: Request, res: Response) => {
    try {
        const count = 18

        if (Avatars_Cache !== null) {
            res.status(200).json({
                success: true,
                data: {
                    avatar: Avatars_Cache
                },
                message: "Successfully fetched avatars"
            })
            return
        }

        const avatars = Array.from({ length: count }, (_, i) => {
            return multiavatar(i.toString() + "@$#!#%")
        })

        Avatars_Cache = avatars

        res.status(200).json({
            success: true,
            data: {
                avatar: avatars
            },
            message: "Successfully fetched avatars"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Failed to fetch avatars",
            message: "Failed to fetch avatars"
        })
    }
}


export const get_single_avatar = (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id)

    if (isNaN(id) || id < 0 || id >= 18) {
        return res.status(400).json({
            success: false,
            data: "Invalid avatar ID",
            message: "Invalid avatar ID"
        })
    }

    try {
        const avatar = Avatars_Cache && Avatars_Cache?.length < 18 ? Avatars_Cache[id] : multiavatar(id.toString() + "@$#!#%")
        res.status(200).json({
            success: true,
            data: {
                avatar: avatar
            },
            message: "Successfully fetched avatar"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Failed to fetch avatar",
            message: "Failed to fetch avatar"
        })
    }

}