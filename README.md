 
# 📄 PDF Chat Bot — Talk to Your Documents

> An AI-powered PDF chatbot built on the MERN stack, using Retrieval-Augmented Generation (RAG) to let users upload documents and have natural, context-aware conversations about their content.

![MERN](https://img.shields.io/badge/Stack-MERN-informational)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![LangGraph](https://img.shields.io/badge/Orchestration-LangGraph-purple)
![Pinecone](https://img.shields.io/badge/Vector%20DB-Pinecone-green)
![Gemini](https://img.shields.io/badge/LLM-Gemini-orange)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

---

## ✨ Overview

**PDF Chat Bot** transforms static PDF documents into interactive, conversational knowledge bases. Upload any PDF — a resume, report, research paper, or contract — and ask questions in plain English. The bot retrieves the most relevant parts of your document and generates clear, well-reasoned answers, remembering the context of your conversation across multiple turns.

Built with a production-style RAG pipeline, this project demonstrates end-to-end AI application engineering: document ingestion, vector search, LLM orchestration, authentication, and persistent chat history — all wired together with a modern MERN architecture.

---

## 🚀 Key Features

- **📤 PDF Upload & Ingestion** — Parses and chunks PDFs intelligently using recursive character splitting for optimal retrieval quality.
- **🧠 Semantic Search with Pinecone** — Document chunks are embedded with Gemini embeddings and stored in Pinecone, enabling fast, meaning-based retrieval instead of simple keyword matching.
- **🤖 Context-Aware Answers** — A LangGraph-orchestrated pipeline retrieves relevant context and generates natural, well-structured responses using Gemini, blending document facts with helpful explanation.
- **💬 Multi-Turn Conversations** — Chat history is persisted per user, per chat, and per document in MongoDB — enabling users to pick up conversations exactly where they left off.
- **🔐 Secure Authentication** — JWT-based auth scopes every document and conversation strictly to its owner.
- **🗂️ Multi-Document, Multi-Chat Support** — Users can manage multiple documents and multiple independent chat threads simultaneously.

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌────────────────────┐
│   Client     │───▶│   Express    │───▶│   Auth Middleware    │
│  (Frontend)  │     │   Server     │     │   (JWT)               │
└─────────────┘     └──────────────┘     └────────────────────┘
                              │
              ┌───────────────┼────────────────┐
              ▼                                 ▼
   ┌─────────────────────┐         ┌─────────────────────────┐
   │  Upload Pipeline      │         │   Chat / RAG Pipeline    │
   │  ─────────────────    │         │   ───────────────────    │
   │  1. Parse PDF          │         │   1. Retrieve (Pinecone) │
   │  2. Chunk text          │         │   2. Generate (Gemini)   │
   │  3. Embed (Gemini)      │         │   3. Save (MongoDB)      │
   │  4. Store (Pinecone)    │         │                          │
   └─────────────────────┘         └─────────────────────────┘
              │                                 │
              ▼                                 ▼
        ┌───────────┐                    ┌──────────────┐
        │  Pinecone  │                    │   MongoDB      │
        │ (Vectors)  │                    │ (Users/Chats)  │
        └───────────┘                    └──────────────┘
```

The core Q&A flow is orchestrated as a **LangGraph state graph**:

```
START → retrieve → generate → saveMessage → END
```

Each node operates on a shared state (`chatId`, `userId`, `documentId`, `question`, `context`, `answer`), making the pipeline modular, testable, and easy to extend with new steps (e.g. re-ranking, summarization, guardrails).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js, TypeScript |
| **Orchestration** | LangGraph, LangChain |
| **LLM & Embeddings** | Google Gemini |
| **Vector Database** | Pinecone |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JWT |
| **File Handling** | Multer,cloudinary, PDFLoader (LangChain) |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/          # DB & environment configuration
│   ├── controllers/      # Route handlers (upload, chat, auth)
│   ├── graph/             # LangGraph state, nodes, and graph definition
│   │   └── nodes/         # retrieve, generate, saveMessage
│   ├── loaders/           # PDF parsing & chunking logic
│   ├── models/            # Mongoose schemas (User, Message)
│   ├── rag/embeddings/    # Embedding & vector storage logic
│   ├── retriever/         # Vector similarity search
│   ├── routes/            # Express route definitions
│   ├── utils/             # Shared helpers (asyncHandler, etc.)
│   └── pinecone.ts        # Pinecone client & vector store setup
└── uploads/               # Temporary PDF storage
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Pinecone account & API key
- Google Gemini API key

### Installation

```bash
git clone https://github.com/mohitbagri8225-ship-it/Pdf-chat-bot.git
cd Pdf-chat-bot/server
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
GOOGLE_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

### Run the server

```bash
npm run dev
```

The server will connect to MongoDB and Pinecone on startup, then start listening for requests.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT |
| `POST` | `/api/upload` | Upload a PDF and embed it into Pinecone |
| `POST` | `/api/chat` | Ask a question about a document |
| `GET`  | `/api/chats/:chatId/messages` | Retrieve full chat history in order |

---

## 🗺️ Roadmap

- [ ] Streaming responses for real-time answer generation
- [ ] Multi-document context (query across several PDFs at once)
- [ ] Source citation with page-level references
- [ ] Frontend chat UI with drag-and-drop upload
- [ ] Support for DOCX and TXT file formats

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a PR or start a discussion.

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ using the MERN stack and Generative AI</p>
