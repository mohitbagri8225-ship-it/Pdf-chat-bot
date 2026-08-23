import type { GraphNode } from "@langchain/langgraph";
import { RAGState } from "../graph/states.js";
import { vectorStore } from "../pinecone.js";

export const retrieve: GraphNode<typeof RAGState> = async (state) => { 

    console.log(state);
    const results = await vectorStore.similaritySearch(
        state.question,
        5,
        {
            chatId: state.chatId,
            documentId: state.documentId,
            userId:state.userId
        }
    );
    console.log("hello",results);
    

    const context = results.map(
        (doc) => doc.pageContent
    );
    console.log("reached : ",context);
    

    return {
        context
    };
};