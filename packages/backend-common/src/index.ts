import { z } from "zod"

export const signUpShouldBe = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password Should Be Atleast 6 Character" })
})

export const signInShouldBe = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password Should Be Atleast 6 Character" })
})

export const roomShouldBe = z.object({
    roomName: z.string().min(1)
})

export type authTokenType = { user_id: string, email: string, name: string }

export const JWT_SECRET = process.env.JWT_SECRET ||"_+"