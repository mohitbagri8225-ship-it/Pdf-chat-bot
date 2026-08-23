// import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from "express"
import { EmbedAndStore } from './rag/embeddings/embeddings.js';

const app = express();
 
app.use(cors({//comm btw server and client
    origin: process.env.CLIENT_URL,
    credentials: true
}));
 
app.use(express.json({ limit: '16kb' })); //prse json body
 
app.use(express.urlencoded({//parse form data
    extended: true,
    limit: '16kb'
}));
 
app.use(express.static('public'));// Serve static files
 
app.use(cookieParser()); //read cookies



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PDF Chatbot server is running!"
    });
});

//rouutes
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/user", userRoutes);

export default app;