import { vectorStore } from "../pinecone.js";
import { loadDocument } from "../loaders/pdfLoader.js";

export async function EmbedAndStore(
    filePath: string,
    chatId: string,
    documentId: string,
    userId:string
) {
    const documents = await loadDocument(filePath);

    const userDocuments = documents.map((doc) => ({
        ...doc,
        metadata: {
            ...doc.metadata,
            chatId,
            documentId,
            userId
        },
    }));
    console.log(documentId," : request is at embedding.ts");
    
    console.log("Storing with metadata:", userDocuments[0]?.metadata);
    const result = await vectorStore.addDocuments(userDocuments);

    console.log("Embeddings generated and stored:", result);

    return result;
}