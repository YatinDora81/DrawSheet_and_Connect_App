import { HTTP_PORT, WS_PORT } from "./ports";

const BASE_HTTP_URL = `http://localhost:${HTTP_PORT}`

export const Get_User_Details_URL = BASE_HTTP_URL + `/api/auth/user-details`;

export const SignUp_User_URL = BASE_HTTP_URL + `/api/auth/signup`

export const SignIn_User_URL = BASE_HTTP_URL + `/api/auth/signin`

export const GET_ROOM_ID_URL = BASE_HTTP_URL + "/api/rooms/get-room-details"

export const GET_ALL_ROOMS_URL = BASE_HTTP_URL + "/api/rooms/get-all-rooms"

export const BASE_WS_URL = `ws://localhost:${WS_PORT}`