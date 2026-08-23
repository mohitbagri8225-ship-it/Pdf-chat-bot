import dotenv from "dotenv";
import ragGraph from "./graph/graph.js"; 

dotenv.config();
interface IGetAnswer {
    chatId: string;
    userId: string;
    documentId: string;
    question: string;
}

export async function getAnswer({
    chatId,
    userId,
    documentId,
    question,
}: IGetAnswer) {

    const result = await ragGraph.invoke({
        chatId,
        userId,
        documentId,
        question,
    });

    return result;
}