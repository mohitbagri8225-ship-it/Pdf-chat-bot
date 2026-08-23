import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
    chatId: string;
    userId: string;
    documentId?: string;
    question: string;
    answer: string;
    seq: number;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        chatId: { type: String, required: true, index: true },
        userId: { type: String, required: true, index: true },
        documentId: { type: String },
        question: { type: String, required: true },
        answer: { type: String, required: true },
        seq: { type: Number, required: true },
    },
    { timestamps: true }
);

// Ensures fast, correct ordering per chat
messageSchema.index({ chatId: 1, seq: 1 });

export const Message = model<IMessage>("Message", messageSchema);