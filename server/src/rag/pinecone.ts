import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-2",
});

const pinecone = new PineconeClient({
    apiKey: process.env.PINECONE_API_KEY!,
});

const pineconeIndex = pinecone.Index(
    process.env.PINECONE_INDEX!
);
console.log("Using Pinecone index:", process.env.PINECONE_INDEX);

export const vectorStore = new PineconeStore(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
});