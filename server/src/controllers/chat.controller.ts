import type { Request, response, Response } from "express";
import { asyncHandler } from "../utils/asynHandler.js"; 
import { EmbedAndStore } from "../rag/embeddings/embeddings.js";
import  {Message}  from "../models/message.model..js";
import apiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import { getAnswer } from "../rag/getResponse.js";

const uploadfileInPincode = asyncHandler(
    async (req: Request, res: Response) => {
        console.log("hello",req.user);
        

        // 1. Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required",
            });
        }

        // 2. Get chatId from request body
        const { chatId,documentId } = req.body; 

        if (!chatId) {
            return res.status(400).json({
                success: false,
                message: "chatId is required",
            });
        }

        // 3. Get userId from authenticated user
        const userId = req.user._id.toString();
        console.log(userId);
        

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // 4. Get uploaded file
        const file = req.file;

        // 5. Send file to RAG pipeline
        await EmbedAndStore(
            file.path,
            chatId,
            documentId,
            userId
        );
        console.log(documentId,"request reached at controller");
        

        // 6. Response
        return res.status(200).json({
            success: true,
            message: "File uploaded and stored successfully",
            data: {
                fileName: file.originalname,
                chatId,
                userId,
            },
        });
    }
);

const getChatHistory = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.body; 
    

    if (!chatId || Array.isArray(chatId)) {
        return res.status(400).json({
            success: false,
            message: "chatId is required and must be a single value",
        });
    }

    interface IHistory{
        question:string
        answer:string
        chatId:string
        seq:number
    }

    let messages :IHistory[]  = await Message.find({ chatId }).sort({ seq: 1 });
    messages = messages.map((obj)=>{
        return {
            question:obj.question,
            answer:obj.answer,
            chatId:obj.chatId,
            seq:obj.seq
        }
    })

    return res.status(200).json({
        success: true,
        data: messages,
    });
});

const askQuestion = asyncHandler(async (req:Request,res:Response)=>{
    console.log(req.user);
    
    const {chatId,documentId,question} = req.body;
    const userId = req.user.id.toString();

    if(!chatId || !documentId || !question ){
        throw new apiError("All fields are required", 400);
    }

    const result = await getAnswer({chatId,userId,documentId,question})
    console.log(result);

     return res.status(201).json(
        new ApiResponse(201, "here is your response",{
            response:result.answer
        })
    );
})

export {
    uploadfileInPincode,
    getChatHistory,
    askQuestion
};