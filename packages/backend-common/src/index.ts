import { z } from "zod"
import {config} from 'dotenv'

config()

export const signUpShouldBe = z.object({
    name: z.string().min(3).max(12),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password Should Be Atleast 6 Character" }),
    isDraw: z.boolean().optional()
})

export const signInShouldBe = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password Should Be Atleast 6 Character" }),
    isDraw: z.boolean().optional()
})

export const roomShouldBe = z.object({
    roomName: z.string().min(1)
})

export const joinRoomShouldBe = z.object({
    roomJoinCode: z.string().min(1)
})

export const updateRoomDetailsShouldBe = z.object({
    roomId: z.string(),
    roomName: z.string().optional(),
    join_code: z.boolean().optional(),
    roomPic: z.string().optional(),
    isFavourite: z.boolean().optional()
})
export type authTokenType = { user_id: string, email: string, name: string }

export const JWT_SECRET = process.env.JWT_SECRET

export const forgotPasswordShouldBe = z.object({
    email: z.string().email({ message: "Please give a email" }),
    isDraw: z.boolean().optional().default(false)
})

export const verifyOtpShouldBe = z.object({
    otp: z.string(),
    email: z.string(),
    isDraw: z.boolean().optional().default(false),
})

export const changePasswordShouldBe = z.object({
    otp_id: z.number(),
    password: z.string().min(6, { message: 'Password Should Be atleast 6 Characters' }),
    email: z.string().email(),
    isDraw: z.boolean().optional().default(false),
})