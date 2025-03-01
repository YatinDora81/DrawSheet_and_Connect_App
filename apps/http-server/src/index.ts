import express from "express"
import cookieParser from "cookie-parser"
import { HTTP_PORT } from "@repo/config/PORTS";
import authRouter from "./routes/auth.js"
import roomRouter from "./routes/room.js"
import { isAuthenticatedUser } from "./middleware/isAuth.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))


const PORT = HTTP_PORT

app.use("/api/auth", authRouter)
app.use("/api/rooms", isAuthenticatedUser, roomRouter);


app.listen(PORT, () => {
    console.log(`App Running at ${PORT}`);
})