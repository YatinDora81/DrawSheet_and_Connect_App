import { mongooseClient, connectMongoDb } from '@repo/db/db'
import { addMessageWorker } from './utils/message_worker.js';
import { config } from 'dotenv';
import express from 'express'

// Just For Deployment
const app = express()
const PORT = 3004
app.listen(PORT, () => {
    console.log(`Server Running at ${PORT} port`);
})

config()

const serverName = process.env.SERVER_NAME!

async function main() {
    await connectMongoDb()

    addMessageWorker(serverName);

}

main();