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

app.get('/health', (_, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      status: 'ok',
      service: 'worker1-server',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  });

app.options('/health', (_, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store');
    res.status(204).end();
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