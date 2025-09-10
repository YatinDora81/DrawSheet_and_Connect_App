import { authTokenType, JWT_SECRET } from "@repo/backend-common/backend-common"
import jwt from "jsonwebtoken"
import { Response } from "express";

export const sendTokenAndCookie = (res: Response, data: { user_id: string, email: string, name: string, profilePic: string }) => {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: '15d' });
    // res.cookie("authToken", token, { maxAge: 15 * 24 * 60 * 60 , sameSite : "none" })
    // res.setHeader("Set-Cookie", `authToken=${token}; Path=/; Secure; SameSite=None; Max-Age=${15 * 24 * 60 * 60}`);
    // res.setHeader(
    //     "Set-Cookie",
    //     `authToken=${token}; Path=/; Secure; HttpOnly; SameSite=None; Domain=.yatindora.xyz; Max-Age=${15 * 24 * 60 * 60}`
    // );

    res.cookie("authToken", token, {
        httpOnly: false, // Allow JavaScript access for Bearer token usage
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax", // Less restrictive for local development
        maxAge: 15 * 24 * 60 * 60 * 1000,
        // domain: ".yatindora.xyz", // Remove domain for local development
      });
      


}