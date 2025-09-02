import { mongooseClient, connectMongoDb } from '@repo/db/db'
import insertChatModel from '@repo/db/insertChatModel'

async function main() {
    await connectMongoDb()

    // setInterval(async () => {
    //     const doc = await insertChatModel.create({
    //         isCompleted: 'true',
    //         message: `Its is random ${Math.random()}`,
    //         processingId: '12',
    //         roomId: '123564789',
    //         userId: '123456789'
    //     })
    //     console.log('doc is ', doc);

    // }, 1000)

}

main();