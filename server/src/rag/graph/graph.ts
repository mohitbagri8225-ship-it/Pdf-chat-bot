import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";

import { RAGState } from "./states.js"; 
import { generate,saveMessage } from "./nodes.js";
import { retrieve } from "../retriever/retriever.js"; 

const ragGraph = new StateGraph(RAGState)
    .addNode("retrieve", retrieve)
    .addNode("generate", generate)
    .addNode("saveMessage", saveMessage)
    .addEdge(START, "retrieve")
    .addEdge("retrieve", "generate")
    .addEdge("generate", "saveMessage")
    .addEdge("saveMessage", END)
    .compile();

export default ragGraph;