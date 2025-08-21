import { WebSocketServer, WebSocket } from "ws";
import { sendErrorResponse, sendResponse } from "./utils/sendResponse.js";
import { isUserVerified } from "./utils/verifyAuthToken.js";
import { User, UserManager } from "./utils/UserManager.js";
import { RoomManager } from "./utils/RoomManager.js";
import { WS_PORT } from "@repo/config/PORTS";
import { prismaClient } from "@repo/db/db";

const wss = new WebSocketServer({ port: WS_PORT }, () => {
    console.log(`WS Connected Successfully`);
})


const wsMap = new Map<WebSocket, User>();
const roomManager = new RoomManager();
const userManager = new UserManager();


wss.on("connection", (ws: WebSocket, request) => {

    const user_from_token = isUserVerified(ws, request);
    if (user_from_token == null) {
        ws.close();
        return;
    }
    else {
        // console.log(user_from_token);
        wsMap.set(ws, user_from_token);
    }

    const userrr = wsMap.get(ws);
    if (userrr) userManager.createUser(ws, userrr);

    ws.on("message", async (ev) => {
        let obj: any
        try {
            const s = ev.toString();
            obj = JSON.parse(s);
        } catch (error) {
            sendErrorResponse(ws, "Invalid Request Please Send Correct JSON Format", "Invalid Request!!!")
            return;
        }

        if (obj.type === "join") {
            // input looks like
            // {
            //     type :  "join",
            //     payload : {
            //         roomId : ""
            //     }
            // }
            const user = wsMap.get(ws);
            if (!user) return;
            roomManager.addRoom(user, obj.payload.roomId);
            userManager.addRoom(ws, obj.payload.roomId);

            const data = {
                name: user.name,
                user_id: user.user_id,
                email: user.email,
                profilePic: user.profilePic,
                roomId: obj.payload.roomId
            }

            sendResponse(ws, true, "join", data, "Room Joined Successfully")

            roomManager.notifyUsers(false, ws, obj.payload.roomId, { type: "notification", success: true, data: user.name + " has joined room", message: user.name + " has joined room" })
            roomManager.update_online_user_count(obj.payload.roomId)

        }
        else if (obj.type === "newly-joined") {
            // input looks like
            // {
            //     type :  "newly-joined",
            //     payload : {
            //         roomId : ""
            //     }
            // }
            const user = wsMap.get(ws);
            if (!user) return;
            const data = {
                id: user.user_id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                roomId : obj.payload.roomId
            }
            roomManager.notifyUsers(false, ws, obj.payload.roomId, { type: "newly-joined", success: true, data })
        }
        else if (obj.type === "subscribe") {
            // input looks like
            // {
            //     type :  "subscribe",
            //     payload : {
            //         roomId : ""
            //     }
            // }
            const user = wsMap.get(ws);
            if (!user) return;
            roomManager.subscribeRoom(user, obj.payload.roomId);
        }
        else if (obj.type === "unsubscribe") {
            // input looks like
            // {
            //     type :  "unsubscribe",
            //     payload : {
            //         roomId : ""
            //     }
            // }
            const user = wsMap.get(ws);
            if (!user) return;
            roomManager.unSubscribeRoom(user, obj.payload.roomId);
        }
        else if (obj.type === "chat") {
            // input looks like
            // {
            //     type :  "chat",
            //     payload : {
            //         roomId : ""
            //         message : ""
            //     }
            // }

            const user = wsMap.get(ws);
            if (!user) return;

            try {
                const isRoom = await prismaClient.userRoom.findFirst({
                    where : {
                        roomId : obj.payload.roomId,
                        userId : user.user_id
                    }
                })
                if(!isRoom){
                    sendErrorResponse(ws, "You Are not a member of this room", "Invalid Request!!!")
                    return 
                }
                await prismaClient.chat.create({
                    data: {
                        message: obj.payload.message,
                        userId: user.user_id,
                        roomId: obj.payload.roomId
                    }
                })
                roomManager.addChat(user, obj.payload.message, obj.payload.roomId)



                roomManager.notifyUsers(true, ws, obj.payload.roomId, {
                    type: "chat", success: true, data: {
                        sender: {
                            name: user.name,
                            user_id: user.user_id,
                            email: user.email,
                            profilePic: user.profilePic,
                            roomId: obj.payload.roomId
                        }, message: obj.payload.message
                    }, message: "New Chat Added"
                })
            } catch (error) {
                console.log(error);
                sendErrorResponse(ws, "Error Occour At Adding Chat!!!", "Error Occour At Adding Chat!!!");
            }

        }
        else if (obj.type === "leave") {
            // input looks like
            // {
            //     type :  "leave",
            //     payload : {
            //         roomId : ""
            //     }
            // }

            const user = wsMap.get(ws);
            if (!user) return;
            roomManager.leaveRoom(user, obj.payload.roomId);
            roomManager.notifyUsers(false, ws, obj.payload.roomId, { type: "notification", success: true, data: user.name + " has left room", message: user.name + " has left room" })
        }
        else if (obj.type === "get-online-users") {
            // input looks like
            // {
            //     type : "get-online-users",
            // }
            online_offline_notification(ws)

        }
        else {
            sendErrorResponse(ws, "Invalid Request Type", "Invalid Request Type")
        }

    })

    ws.on("error", () => {
        sendErrorResponse(ws, "Something Went Wrong!!!", "Something Went Wrong!!!");
        // ws.close();
    })

    ws.on("close", () => {
        const user = wsMap.get(ws);
        if (user) {
            roomManager.removeUserEntry(user);
            online_offline_notification(ws);
            userManager.removeUserEntry(ws);
        }
        wsMap.delete(ws);
    })

})


const online_offline_notification = (ws: WebSocket) => {
    userManager.getUserMap(ws)?.rooms.forEach((roomId) => roomManager.update_online_user_count(roomId))
}