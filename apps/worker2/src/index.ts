import { mongooseClient, connectMongoDb } from '@repo/db/db'
import { addMessageWorker } from './utils/message_worker.js';
import { config } from 'dotenv';

config()

const serverName = process.env.SERVER_NAME!

async function main() {
    await connectMongoDb()

    addMessageWorker(serverName);

}

main();