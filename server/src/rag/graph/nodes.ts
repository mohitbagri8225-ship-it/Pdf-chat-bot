import type { GraphNode } from "@langchain/langgraph";
import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { RAGState } from "./states.js";
import { retrieve } from "../retriever/retriever.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    temperature: 0,
});

export const generate: GraphNode<typeof RAGState> = async (state) => {

    const context = state.context.join("\n\n");

const prompt = `
You are an expert assistant that helps users understand and work with their documents.

---------------- DOCUMENT CONTEXT ----------------
${context}
----------------------------------------------------

User's question:
${state.question}

Instructions:

1. Treat the document context above as your primary source of truth. Base your answer on it first.
2. Write in clear, natural, confident language — as if explaining to a smart colleague, not reciting the document.
3. Structure your answer for readability:
   - Use short paragraphs or bullet points, not dense walls of text.
   - Use headings or bold labels only when the answer has multiple distinct sections (e.g. categories, steps, comparisons).
   - For simple factual questions, answer directly in 1-3 sentences — don't over-structure a short answer.
4. You may use general knowledge to explain concepts, define terms, or give examples — but clearly distinguish this from what the document actually says (e.g. "The document doesn't specify X, but generally...").
5. Never say phrases like "based on the context", "the retrieved chunks", "the provided document" repeatedly — refer naturally to "your document", "your resume", "the text", etc., or just answer directly without meta-references.
6. If the context is empty or clearly insufficient to answer the question, say so plainly and ask the user to clarify or upload relevant content — do not fabricate an answer.
7. Match the user's tone: concise for quick questions, more thorough for open-ended or analytical questions.
8. End with a natural close — no generic AI disclaimers or "let me know if you need anything else" unless it genuinely adds value.

Answer:
`;

    const response = await llm.invoke(prompt);

    return {
        answer: response.content.toString(),
    };
};

import { Message } from "../../models/message.model..js";

export const saveMessage: GraphNode<typeof RAGState> = async (state) => {
    if (!state.chatId || !state.userId || !state.question || !state.answer) {
        console.warn("saveMessage: missing required fields, skipping save", state);
        return {};
    }

    const lastMessage = await Message.findOne({ chatId: state.chatId })
        .sort({ seq: -1 })
        .select("seq");

    const nextSeq = (lastMessage?.seq ?? 0) + 1;

    await Message.create({
        chatId: state.chatId,
        userId: state.userId,
        documentId: state.documentId,
        question: state.question,
        answer: state.answer,
        seq: nextSeq,
    });

    console.log("Chat exchange saved. chatId:", state.chatId, "seq:", nextSeq);

    return {};
};