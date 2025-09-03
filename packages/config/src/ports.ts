import { config } from "dotenv"
config()

export const HTTP_PORT = process.env.HTTP_PORT

export const WS_PORT = process.env.WS_PORT