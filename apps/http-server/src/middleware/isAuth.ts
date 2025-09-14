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
        // Check for token in cookies first (primary method)
        let token = req.cookies["authToken"]
        
        // If no cookie token, check Authorization header as fallback
        if (!token) {
            const authHeader = req.headers.authorization
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7) // Remove 'Bearer ' prefix
                console.log("Using token from Authorization header")
            }
        } else {
            console.log("Using token from cookie")
        }
        
        if (!token) {
            res.status(400).json({
                success: false,
                data: "No Token Present",
                message: "No Token Present"
            })
            return
        }

        const decode = jwt.verify(token, JWT_SECRET) as { user_id: string, email: string, name: string, profilePic: string }
        req.user = decode
        next()

    } catch (error) {
        console.error("Authentication error:", error)
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