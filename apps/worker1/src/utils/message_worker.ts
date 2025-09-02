import { prismaClient } from "@repo/db/db";
import insertChatModel from "@repo/db/insertChatModel";

export const addMessageWorker = async (serverName: string) => {
    try {

        const stream = insertChatModel.watch(
            [
                { $match: { operationType: "insert" } },

            ]
        )

        stream.on("change", async (next) => {

            const doc = next.fullDocument

            if (
                !doc.isCompleted &&
                doc.processingId.startsWith(serverName)
            ) {

                await prismaClient.chat.create({
                    data: {
                        message: doc.message,
                        userId: doc.userId,
                        roomId: doc.roomId
                    }
                })

                await insertChatModel.updateOne({ _id: doc._id }, { $set: { isCompleted: true } })

            }

        });

        stream.on("error", (err) => {
            console.error("❌ Change stream error:", err.message);
            console.log("🔄 Reconnecting in 5s...");
            setTimeout(addMessageWorker, 5000); // retry
        });

        stream.on("end", () => {
            console.warn("⚠️ Change stream ended. Restarting...");
            setTimeout(addMessageWorker, 5000);
        });

    } catch (error) {
        console.log(`Error at inserting data!!! ${error}`);
        setTimeout(addMessageWorker, 5000)
    }
} 