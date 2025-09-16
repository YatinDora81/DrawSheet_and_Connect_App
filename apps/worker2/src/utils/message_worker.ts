import { prismaClient } from "@repo/db/db";
import insertChatModel from "@repo/db/insertChatModel";

const getTimestamp = () => new Date().toISOString();

export const addMessageWorker = async (serverName: string) => {
    try {
        console.log(`[${getTimestamp()}] 🔄 [WORKER2] Starting message worker for server: ${serverName}`);

        const stream = insertChatModel.watch(
            [
                { $match: { operationType: "insert" } },

            ]
        )

        console.log(`[${getTimestamp()}] 👀 [WORKER2] MongoDB change stream initialized, watching for inserts...`);

        stream.on("change", async (next) => {
            console.log(`[${getTimestamp()}] 📨 [WORKER2] New change detected in MongoDB`);

            const doc = next.fullDocument
            console.log(`[${getTimestamp()}] 📄 [WORKER2] Document details:`, {
                _id: doc._id,
                message: doc.message?.substring(0, 50) + (doc.message?.length > 50 ? '...' : ''),
                userId: doc.userId,
                roomId: doc.roomId,
                processingId: doc.processingId,
                isCompleted: doc.isCompleted,
                serverName: serverName
            });

            if (
                !doc.isCompleted &&
                doc.processingId.startsWith(serverName)
            ) {
                console.log(`[${getTimestamp()}] ✅ [WORKER2] Processing message - matches server ${serverName}`);

                try {
                    console.log(`[${getTimestamp()}] 💾 [WORKER2] Creating chat record in Prisma...`);
                    
                    const chatRecord = await prismaClient.chat.create({
                        data: {
                            message: doc.message,
                            userId: doc.userId,
                            roomId: doc.roomId
                        }
                    });

                    console.log(`[${getTimestamp()}] ✅ [WORKER2] Chat record created successfully:`, {
                        id: chatRecord.id,
                        userId: chatRecord.userId,
                        roomId: chatRecord.roomId
                    });

                    console.log(`[${getTimestamp()}] 🔄 [WORKER2] Marking MongoDB document as completed...`);
                    
                    await insertChatModel.updateOne({ _id: doc._id }, { $set: { isCompleted: true } });
                    
                    console.log(`[${getTimestamp()}] ✅ [WORKER2] Document marked as completed successfully`);

                } catch (error) {
                    console.error(`[${getTimestamp()}] ❌ [WORKER2] Error processing message:`, error);
                }

            } else {
                console.log(`[${getTimestamp()}] ⏭️ [WORKER2] Skipping message - not for this server or already completed:`, {
                    isCompleted: doc.isCompleted,
                    processingId: doc.processingId,
                    expectedServerPrefix: serverName
                });
            }

        });

        stream.on("error", (err) => {
            console.error(`[${getTimestamp()}] ❌ [WORKER2] Change stream error:`, err.message);
            console.log(`[${getTimestamp()}] 🔄 [WORKER2] Reconnecting in 5s...`);
            setTimeout(() => addMessageWorker(serverName), 5000); // retry
        });

        stream.on("end", () => {
            console.warn(`[${getTimestamp()}] ⚠️ [WORKER2] Change stream ended. Restarting...`);
            setTimeout(() => addMessageWorker(serverName), 5000);
        });

    } catch (error) {
        console.error(`[${getTimestamp()}] ❌ [WORKER2] Critical error at inserting data:`, error);
        console.log(`[${getTimestamp()}] 🔄 [WORKER2] Retrying in 5s...`);
        setTimeout(() => addMessageWorker(serverName), 5000)
    }
} 