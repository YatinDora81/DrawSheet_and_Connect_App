import express, { Request, Response } from "express"
import { createRoomShouldBe, signInShouldBe, signUpShouldBe } from "@repo/backend-common/backend-common"
import { sendTokenAndCookie } from "./utils/sendTokenAndCookie.js";
import { prismaClient } from "@repo/db/db"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import { isAuthenticatedUser } from "./middleware/isAuth.js";
import generateRoomId from "./utils/generateRoomId.js";



const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3001

//@ts-ignore
app.post("/api/auth/signup", async (req: Request, res: Response) => {
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
                    password: hassedPassword
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
})

//@ts-ignore
app.post("/api/auth/signin", async (req: Request, res: Response) => {
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
                email: parsedData.data.email
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
            message: "User Created Successfully"
        })



    } catch (error: any) {

        return res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
    }
})

// @ts-ignore
app.post("/create-room", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {

        const parsedData = createRoomShouldBe.safeParse(req.body)
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
                data: "UnAuthorized",
                message: "UnAuthorized"
            })
            return
        }

        let newRoom;
        try {
            newRoom = await prismaClient.room.create({
                data: {
                    roomName: parsedData.data.roomName,
                    createdBy: req.user.user_id,
                    members: [req.user.user_id]
                }
            })

        } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("roomName")) {
                res.status(400).json({
                    success: false,
                    data: "Room name already exists!",
                    message: "Duplicate Room Name Error",
                });
                return;
            }

            res.status(400).json({
                success: false,
                data: "Room name already exists!",
                message: "Duplicate Room Name Error",
            });
            return;
        }

        res.status(200).json({
            success: false,
            data: newRoom,
            message: "Room Created Sucessfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
    }
})

// @ts-ignore
app.get("/get-room-details/:slug", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {

        const slug = req.params.slug
        const roomDetails = await prismaClient.room.findFirst({
            where: {
                roomName: slug
            }
        })
        if (!roomDetails) {
            res.status(400).json({
                success: false,
                data: "No Room!!!",
                message: "No Room!!!"
            })
            return
        }

        res.status(200).json({
            success: true,
            data: roomDetails,
            message: "successfully Got "
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
    }
})

// @ts-ignore
app.get("/get-chat/:roomId/:chatMultiplier", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {

        const { roomId, chatMultiplier } = req.params
        const needChat = 100
        const isRoom = await prismaClient.room.findFirst({
            where: {
                id: roomId
            },
            select: {
                id: true,
                roomName: true,
                createdBy: true,
                createdAt: true,
                members: true,
                chats: {
                    take: needChat,
                    skip: parseInt(chatMultiplier as string) * (needChat)
                }
            }
        })


        if (!isRoom) {

            res.status(400).json({
                success: false,
                data: "No Room vailable",
                message: "No Room vailable"
            })

            return
        }

        res.status(200).json({
            success: true,
            data: isRoom,
            message: "Successfully Get Chats"
        })

        return


    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
        return
    }
})

// @ts-ignore
app.get("/get-all-chats/:roomId", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {

        const { roomId } = req.params

        const isRoom = await prismaClient.chat.findFirst({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "asc"
            }
        })


        if (!isRoom) {

            res.status(400).json({
                success: false,
                data: "No Room vailable",
                message: "No Room vailable"
            })

            return
        }

        res.status(200).json({
            success: true,
            data: isRoom,
            message: "Successfully Get Chats"
        })

        return


    } catch (error) {
        res.status(500).json({
            success: false,
            data: error,
            message: "Internal Server Error!!!"
        })
        return
    }
})

app.post("/add-chat", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {
        const { message, roomId } = req.body;

        // Validate request data
        if (!message || !roomId) {
            res.status(400).json({
                success: false,
                data: "Message and Room ID are required.",
                message: "Invalid Input",
            });
            return;
        }

        if (!req.user) {
            res.status(401).json({
                success: false,
                data: "Unauthorized",
                message: "You must be logged in to send a message.",
            });
            return;
        }

        // Ensure the room exists
        const room = await prismaClient.room.findUnique({
            where: { id: roomId },
        });

        if (!room) {
            res.status(404).json({
                success: false,
                data: "Room not found.",
                message: "Invalid Room ID",
            });
            return;
        }

        // Ensure the user is a member of the room
        if (!room.members.includes(req.user.user_id)) {
            res.status(403).json({
                success: false,
                data: "User is not a member of this room.",
                message: "Access Denied",
            });
            return;
        }

        // Create the chat message
        const newChat = await prismaClient.chat.create({
            data: {
                message,
                userId: req.user.user_id,
                roomId,
            },
        });

        res.status(201).json({
            success: true,
            data: newChat,
            message: "Message sent successfully!",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
});

app.get("/create-random-room", isAuthenticatedUser, async (req: Request, res: Response) => {
    try {

        if (!req.user) {
            res.status(401).json({
                success: false,
                data: "Unauthorized",
                message: "You must be logged in to send a message.",
            });
            return;
        }

        let newRoom = generateRoomId();
        
        while (true) {
            try {
                const isRoom = await prismaClient.room.findFirst({
                    where: {
                        roomName: newRoom
                    }
                })
                if (!isRoom) break;
            } catch (error) {
                newRoom = generateRoomId();
            }
        }

        const newRoomDetails = await prismaClient.room.create({
            data: {
                roomName: newRoom,
                createdBy: req.user.user_id,
                members : [req.user.user_id]
            }
        })

        res.status(200).json({
            success: true,
            data: newRoomDetails,
            message: "New Room Created Successfully"
        })

    } catch (error : any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }

})


app.listen(PORT, () => {
    console.log(`App Running at ${PORT}`);
})