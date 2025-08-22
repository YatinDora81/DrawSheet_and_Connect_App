import express from "express"
import cookieParser from "cookie-parser"
import { HTTP_PORT } from "@repo/config/PORTS";
import authRouter from "./routes/auth.js"
import roomRouter from "./routes/room.js"
import { isAuthenticatedUser } from "./middleware/isAuth.js";
import { config } from "dotenv";
import cors from "cors"
import { authLimiter, roomLimiter } from "./config/rateLimiter.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
config()
// app.use(cors({ origin: "http://localhost:3003", credentials: true }))

const allowedOrigins: string[] | string = process.env.ORIGINS || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const PORT = HTTP_PORT

app.use("/api/auth", authLimiter, authRouter)
app.use("/api/rooms", roomLimiter, isAuthenticatedUser, roomRouter);


app.listen(PORT, () => {
  console.log(`App Running at ${PORT}`);
})