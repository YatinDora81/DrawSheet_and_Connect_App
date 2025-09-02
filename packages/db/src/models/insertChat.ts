import mongoose from "mongoose";

const InsertChatSchema = new mongoose.Schema({
    message: {
        type: 'string',
    },
    userId: {
        type: 'string'
    },
    roomId: {
        type: 'string'
    },
    isCompleted: {
        type: 'boolean'
    },
    processingId: {
        type: 'string'
    },
})

export default mongoose.model('InsertChat', InsertChatSchema)