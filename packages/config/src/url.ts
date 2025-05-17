import { HTTP_PORT, WS_PORT } from "./ports";

const BASE_HTTP_URL = `http://localhost:${HTTP_PORT}`

export const Get_User_Details_URL = BASE_HTTP_URL + `/api/auth/user-details`;

export const SignUp_User_URL = BASE_HTTP_URL + `/api/auth/signup`

export const SignIn_User_URL = BASE_HTTP_URL + `/api/auth/signin`

export const SignOut_User_URL = BASE_HTTP_URL + `/api/auth/signout`

export const GET_ROOM_ID_URL = BASE_HTTP_URL + "/api/rooms/get-room-details"

export const GET_ALL_ROOMS_URL = BASE_HTTP_URL + "/api/rooms/get-all-rooms"

export const GET_CHATS_PAGINATION = BASE_HTTP_URL + "/api/rooms/get-chat"

export const GET_ALL_CHATS = BASE_HTTP_URL + "/api/rooms/get-all-chats"

export const CREATE_NEW_ROOM_URL = BASE_HTTP_URL + "/api/rooms/create-room"

export const JOIN_NEW_ROOM_URL = BASE_HTTP_URL + "/api/rooms/join-room"

export const UPDATE_ROOM_DETAILS = BASE_HTTP_URL + "/api/rooms/update-details"

export const BASE_WS_URL = `ws://localhost:${WS_PORT}`