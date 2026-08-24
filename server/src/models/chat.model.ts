import mongoose from "mongoose";
import { User } from "./user.model.js";

export interface IChat extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    documents: string[];
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new mongoose.Schema<IChat>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        }, 
        documents: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

export const Chat = mongoose.model<IChat>("Chat", chatSchema);