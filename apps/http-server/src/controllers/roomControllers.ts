import { joinRoomShouldBe, roomShouldBe, updateRoomDetailsShouldBe } from "@repo/backend-common/backend-common"
import { prismaClient } from "@repo/db/db"
import { Request, Response } from "express"
import generateRoomId from "../utils/generateRoomId.js"
import { createId } from "@paralleldrive/cuid2"


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
        let newpair;
        try {


            newRoom = await prismaClient.room.create({
                data: {
                    roomName: parsedData.data.roomName,
                    createdById: req.user.user_id,
                    join_code: createId()
                }
            })
            newpair = await prismaClient.userRoom.create({
                data: {
                    userId: req.user.user_id,
                    roomId: newRoom.id
                },
                select: {
                    room: {
                        select: {
                            id: true,
                            roomName: true,
                            roomPic: true,
                            createdById: true,
                            createdAt: true,
                            updatedAt: true,
                            join_code: true,
                            members: {
                                select: {
                                    user: true
                                }
                            }
                        }
                    }
                }
            })

        } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("join_code")) {
                res.status(400).json({
                    success: false,
                    data: "Room Code already exists!",
                    message: "Duplicate Room Code Error",
                });
                return;
            }

            res.status(400).json({
                success: false,
                data: "Room Code already exists!",
                message: "Duplicate Room Code Error",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: newpair.room,
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

        const isRoom = await prismaClient.room.findFirst({
            where: {
                id: roomId
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

        const needChat = 100
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            select: {
                id: true,
                message: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                roomId: true,
                createdAt: true
            },
            take: needChat,
            skip: parseInt(chatMultiplier as string) * (needChat),
            orderBy: {
                id: "desc"
            }
        })


        res.status(200).json({
            success: true,
            data: chats,
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

        const isRoom = await prismaClient.room.findFirst({
            where: {
                id: roomId
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


        const chats = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            select: {
                id: true,
                message: true,
                userId: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                roomId: true,
                createdAt: true
            },
            orderBy: {
                id: "desc"
            }
        })


        res.status(200).json({
            success: true,
            data: chats,
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

        let newcode = createId();

        while (true) {
            try {
                const isRoom = await prismaClient.room.findFirst({
                    where: {
                        join_code: newcode
                    }
                })
                if (!isRoom) break;
            } catch (error) {
                newcode = createId();
            }
        }

        const newRoomDetails = await prismaClient.room.create({
            data: {
                roomName: generateRoomId(),
                createdById: req.user.user_id,
                join_code: newcode
            },
            select: {
                id: true,
                roomName: true,
                roomPic: true,
                createdById: true,
                createdAt: true,
                updatedAt: true,
                join_code: true,
                members: {
                    select: {
                        user: true
                    }
                }
            }
        })
        const newpair = await prismaClient.userRoom.create({
            data: {
                userId: req.user.user_id,
                roomId: newRoomDetails.id
            },
            select: {
                room: {
                    select: {
                        id: true,
                        roomName: true,
                        roomPic: true,
                        createdById: true,
                        createdAt: true,
                        updatedAt: true,
                        join_code: true,
                        members: {
                            select: {
                                user: true
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            data: newpair.room,
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

        const parsedData = joinRoomShouldBe.safeParse(req.body)
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
                join_code: parsedData.data.roomJoinCode
            },
            select: {
                id: true,
                roomName: true,
                roomPic: true,
                createdById: true,
                createdAt: true,
                updatedAt: true,
                join_code: true,
                members: {
                    select: {
                        user: true
                    }
                }
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
            where: {
                userId: req.user.user_id,
                roomId: isRoom.id
            }
        })

        if (isUserExists) {
            res.status(400).json({
                success: false,
                data: "User Already Exists in Room!!!",
                message: "User Already Exists in Room!!!"
            })
            return
        }

        await prismaClient.userRoom.create({
            data: {
                userId: req.user.user_id,
                roomId: isRoom.id
            }
        })

        res.status(200).json({
            success: true,
            data: isRoom,
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

        // const allrooms = 

        const allrooms = await prismaClient.userRoom.findMany({
            where: {
                userId: req.user.user_id
            },
            select: {
                room: {
                    select: {
                        id: true,
                        roomName: true,
                        roomPic: true,
                        createdById: true,
                        createdAt: true,
                        updatedAt: true,
                        join_code: true,
                        members: {
                            select: {
                                user: true
                            }
                        }
                    }
                }
            }
        }
        )

        res.status(200).json({
            success: true,
            data: allrooms,
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


export const update_details_controller = async (req: Request, res: Response) => {
    try {
        const parsedData = updateRoomDetailsShouldBe.safeParse(req.body)

        if (!parsedData.success) {
            res.status(400).json({
                success: false,
                data: parsedData?.error?.issues[0]?.message || "",
                message: "Invalid Format!!!"
            })
            console.log(parsedData.error);
            
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
        if (parsedData.data.roomId.trim() === "") {
            res.status(400).json({
                success: false,
                data: "Room Id is not present!!!",
                message: "Room Id is not present!!!"
            })
            return
        }

        if(parsedData.data.roomName.trim() === "" && parsedData.data.join_code===false && parsedData.data.roomPic.trim()===""){
            res.status(400).json({
                success : false,
                data : "Invalid Input",
                message : "Invalid Input"
            })
            return;
        }

        let obj = {};
        if (parsedData.data.roomName !== "") obj = { ...obj, "roomName": parsedData.data.roomName }
        if (parsedData.data.join_code) obj = { ...obj, "join_code": createId() }
        if (parsedData.data.roomPic!=="") obj = { ...obj, "roomPic": parsedData.data.roomPic };
        
        const updatedRoom = await prismaClient.room.update({
            where: {
                id: parsedData.data.roomId
            },
            data: {
                ...obj,
                updatedAt : new Date()
            },
            select: {
                id: true,
                roomName: true,
                roomPic: true,
                createdById: true,
                createdAt: true,
                updatedAt: true,
                join_code: true,
                members: {
                    select: {
                        user: true
                    }
                }
            }
        })

        res.status(200).json({
            success: true,
            data: updatedRoom,
            message : "Details Updated Successfully"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            data: error.message || "",
            message: "Internal Server Error",
        });
    }
}