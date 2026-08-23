import { Annotation } from "@langchain/langgraph";

export const RAGState = Annotation.Root({
    userId: Annotation<string>(),
    documentId: Annotation<string>(),
    chatId: Annotation<string>(),
    question: Annotation<string>(),

    context: Annotation<string[]>({
        reducer: (_, next) => next,
        default: () => [],
    }),

    answer: Annotation<string>({
        reducer: (_, next) => next,
        default: () => "",
    }),
});