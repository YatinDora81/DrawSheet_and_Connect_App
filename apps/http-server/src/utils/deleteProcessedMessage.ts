import insertChat from "@repo/db/insertChatModel"

export const deleteProcessedMessage = async () => {
    try {
        await insertChat.deleteMany({ isCompleted: true })
    } catch (error) {
        console.log(`Error at deleting processed chats ${error}`);
    }
}