import { signInShouldBe, signUpShouldBe } from "@repo/backend-common/backend-common";
import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { prismaClient } from "@repo/db/db";
import { sendTokenAndCookie } from "../utils/sendTokenAndCookie.js";
import { z } from 'zod';


export const signupController = async (req: Request, res: Response) => {
    try {

        const parsedData = signUpShouldBe.safeParse(req.body)
        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                data: parsedData?.error?.issues[0]?.message || "",
                message: "Invalid Format!!!"
            })
        }

        let hassedPassword;
        try {

            hassedPassword = await bcrypt.hash(parsedData.data.password, 10);

        } catch (error) {
            return res.status(400).json({
                success: false,
                data: "Error At Hashing Password",
                message: "Error At Hashing Password"
            })
        }


        //db call
        let newUser: any
        try {
            newUser = await prismaClient.user.create({
                data: {
                    name: parsedData.data.name,
                    email: parsedData.data.email,
                    password: hassedPassword,
                    isDraw: parsedData.data.isDraw ? true : false
                },
                select: {
                    name: true,
                    email: true,
                    id: true,
                    profilePic: true
                }
            })
            sendTokenAndCookie(res, { user_id: newUser.id, email: newUser.email, name: newUser.name, profilePic: newUser.profilePic || "" });

        } catch (error: any) {
            if (error.code && error.code === "P2002" && error.meta?.target?.includes("email")) {
                return res.status(400).json({
                    success: false,
                    data: "Email already exists",
                    message: "Duplicate Email Error",
                });
            }
            return res.status(500).json({
                success: false,
                data: error,
                message: "Internal Server Error!!!"
            })
        }


        res.status(200).json({
            success: true,
            data: newUser,
            message: "User Created Successfully"
        })



    } catch (error: any) {

        return res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
    }
}

export const signinController = async (req: Request, res: Response) => {
    try {

        const parsedData = signInShouldBe.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({
                success: false,
                data: parsedData?.error?.issues[0]?.message || "",
                message: "Invalid Format!!!"
            })
            return
        }



        //db call
        const isUser = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email,
                isDraw: parsedData.data.isDraw ? true : false
            }
        })

        if (!isUser) {
            return res.status(400).json({
                success: false,
                data: "No User Exists!!!",
                message: "No User Exists!!!"
            })
        }

        const isMatched = await bcrypt.compare(parsedData.data.password, isUser.password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                data: "Password is Incorrect",
                message: "Password is Incorrect"
            })
        }


        sendTokenAndCookie(res, { user_id: isUser.id, name: isUser.name, email: isUser.email, profilePic: isUser.profilePic || "" })
        res.status(200).json({
            success: true,
            data: {
                id: isUser.id,
                name: isUser.name,
                email: isUser.email,
                profilePic: isUser.profilePic
            },
            message: "User Signin Successfully"
        })



    } catch (error: any) {

        return res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
    }
}

export const signoutController = (req: Request, res: Response) => {
    try {
        res.clearCookie("authToken", { httpOnly: true })

        res.status(200).json({
            success: true,
            data: "User Signout Successfully!!!",
            message: "User Signout Successfully!!!"
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}

export const userDetailController = (req: Request, res: Response) => {
    try {

        if (!req.user) {
            res.status(400).json({
                success: false,
                data: "User Not Authenicated!!!",
                message: "User Not Authenicated!!!"
            })
            return
        }

        res.status(200).json({
            success: true,
            data: req.user,
            message: "Successfully Get User Details"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}

export const updateAvatar = async (req: Request, res: Response) => {
    try {

        const body = z.object({
            avatarNumber: z.string()
        })
        const parsedData = body.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({
                success: false,
                data: parsedData?.error?.issues[0]?.message || "",
                message: "Invalid Format!!!"
            })
            return
        }


        if (!req.user) {
            res.status(400).json({
                success: false,
                data: "User Not Authenicated!!!",
                message: "User Not Authenicated!!!"
            })
            return
        }


        const newuser = await prismaClient.user.update({
            where: {
                id: req.user.user_id,
            },
            data: {
                profilePic: parsedData.data.avatarNumber
            },
        })

        res.status(200).json({
            success: true,
            data: newuser,
            message: "Avatar Updated Successfully"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}