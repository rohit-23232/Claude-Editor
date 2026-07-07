import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve Frontend
app.use(express.static(path.join(__dirname, "../public")));

// API Routes
app.use("/api/chat", chatRouter);

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "online",
        provider: process.env.DEFAULT_PROVIDER,
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

// Homepage
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log("");
    console.log("====================================");
    console.log("🚀 AI Editor Server Started");
    console.log("====================================");
    console.log(`Server : http://localhost:${PORT}`);
    console.log(`Provider : ${process.env.DEFAULT_PROVIDER}`);
    console.log(`Environment : ${process.env.NODE_ENV}`);
    console.log("====================================");
});
