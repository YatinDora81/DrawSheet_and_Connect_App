import { mongooseClient, connectMongoDb } from '@repo/db/db'
import { addMessageWorker } from './utils/message_worker.js';
import { config } from 'dotenv';
import express from 'express'

// Just For Deployment
const app = express()
const PORT = 3004

app.get('/', (_, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'worker1-server'
    });
  });

config()

const serverName = process.env.SERVER_NAME!

async function main() {
    await connectMongoDb()

    addMessageWorker(serverName);
    
}

main();

app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT} port`);
})