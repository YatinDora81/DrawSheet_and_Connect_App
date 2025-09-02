import { PrismaClient } from "@prisma/client";
import { config } from 'dotenv';
import mongoose from "mongoose";

config()

export const connectMongoDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL!).then(() => console.log(`MongoDb Connected!!!`)).catch((err) => console.log(`Error at connecting mongodb ${err}!!!`))
}

export const prismaClient = new PrismaClient();
export const mongooseClient = mongoose