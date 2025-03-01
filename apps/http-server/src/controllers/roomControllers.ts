import { roomShouldBe } from "@repo/backend-common/backend-common"
import { prismaClient } from "@repo/db/db"
import { Request, Response } from "express"
import generateRoomId from "../utils/generateRoomId.js"

export const createRoomController = async (req: Request, res: Response) => {
    try {

        const parsedData = roomShouldBe.safeParse(req.body)
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
                    createdById: req.user.user_id
                }
            })
            await prismaClient.userRoom.create({
                data: {
                    userId: req.user.user_id,
                    roomId: newRoom.id
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
}


export const get_room_detailsController = async (req: Request, res: Response) => {
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
}




export const get_chat_roomId_chatMultiplierController = async (req: Request, res: Response) => {
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
                    skip: parseInt(chatMultiplier as string) * (needChat),
                    orderBy: {
                        id: "desc"
                    }
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
}




export const get_all_chats_roomIdController = async (req: Request, res: Response) => {
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
}




export const add_chatController = async (req: Request, res: Response) => {
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

        if (!req.user || !req.user.user_id) {
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
            select: {
                members: {
                    select: {
                        userId: true
                    }
                }
            }
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
        if (!room.members.some(member => member.userId === req.user!.user_id)) {
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
}

export const create_random_roomController = async (req: Request, res: Response) => {
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
                createdById: req.user.user_id
            }
        })
        await prismaClient.userRoom.create({
            data: {
                userId: req.user.user_id,
                roomId: newRoomDetails.id
            }
        })

        res.status(200).json({
            success: true,
            data: newRoomDetails,
            message: "New Room Created Successfully"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }

}

export const leave_roomController = async (req: Request, res: Response) => {
    try {

        const parsedData = roomShouldBe.safeParse(req.body)
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

        const isRoom = await prismaClient.room.findFirst({
            where: {
                roomName: parsedData.data.roomName
            }
        })

        if (!isRoom) {
            res.status(400).json({
                success: false,
                data: "No Room Exists!!!",
                message: "No Room Exists!!!"
            })
            return
        }

        const isUser = await prismaClient.userRoom.findFirst({
            where: {
                roomId: isRoom.id,
                userId: req.user.user_id
            }
        })

        if (!isUser) {
            res.status(400).json({
                success: false,
                data: "You are not present in room!!!",
                message: "You are not present in room!!!"
            })
            return
        }

        await prismaClient.userRoom.delete({
            where: {
                // composite key format
                userId_roomId: {
                    roomId: isRoom.id,
                    userId: req.user.user_id
                }
            }
        })

        res.status(200).json({
            success: true,
            data: "Room Left Successfully",
            message: "Room Left Successfully"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}

export const join_roomController = async (req: Request, res: Response) => {
    try {

        const parsedData = roomShouldBe.safeParse(req.body)
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

        const isRoom = await prismaClient.room.findFirst({
            where: {
                roomName: parsedData.data.roomName
            }
        })

        if (!isRoom) {
            res.status(400).json({
                success: false,
                data: "No Room Exists!!!",
                message: "No Room Exists!!!"
            })
            return
        }

        const isUserExists = await prismaClient.userRoom.findFirst({
            where : {
                userId : req.user.user_id,
                roomId : isRoom.id
            }
        })

        if(isUserExists){
            res.status(400).json({
                success: false,
                data: "User Already Exists in Room!!!",
                message: "User Already Exists in Room!!!"
            })
            return
        }

        await prismaClient.userRoom.create({
            data : {
                userId : req.user.user_id,
                roomId : isRoom.id
            }
        })

        res.status(200).json({
            success: true,
            data: "Room Joined Successfully",
            message: "Room Joined Successfully"
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}


export const get_all_roomsController = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                data: "Unauthorized",
                message: "You must be logged in to send a message.",
            });
            return;
        }

        const allrooms = await prismaClient.user.findFirst({
            where: {
                id: req.user.user_id
            },
            include: {
                rooms: true
            }

        })

        res.status(200).json({
            success: true,
            data: allrooms?.rooms,
            message: "Successfully Get All Rooms of User"
        })


    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}