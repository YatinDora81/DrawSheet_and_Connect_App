import { roomShouldBe } from "@repo/backend-common/backend-common"
import { prismaClient } from "@repo/db/db"
import express, { Router , Request , Response } from "express"
import { isAuthenticatedUser } from "../middleware/isAuth.js"
import generateRoomId from "../utils/generateRoomId.js"
import { add_chatController, create_random_roomController, createRoomController, get_all_chats_roomIdController, get_chat_roomId_chatMultiplierController, get_room_detailsController, join_roomController, leave_roomController, get_all_roomsController, update_details_controller } from "../controllers/roomControllers.js"

const router : Router = express.Router()


// @ts-ignore
router.post("/create-room", createRoomController)

// @ts-ignore
router.get("/get-room-details/:slug", get_room_detailsController)

// @ts-ignore
router.get("/get-chat/:roomId/:chatMultiplier", get_chat_roomId_chatMultiplierController )

// @ts-ignore
router.get("/get-all-chats/:roomId", get_all_chats_roomIdController)

router.post("/add-chat", add_chatController);

router.get("/create-random-room", create_random_roomController)

router.post("/leave-room"  , leave_roomController)

router.post("/join-room"  ,join_roomController)

router.get("/get-all-rooms" , get_all_roomsController)

router.post("/update-details" , update_details_controller);

export default router