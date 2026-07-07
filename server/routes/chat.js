import express from "express";

import { chatWithClaude } from "../providers/claude.js";
import { chatWithOpenAI } from "../providers/openai.js";
import { chatWithGemini } from "../providers/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            message,
            provider,
            model,
            history = []
        } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required."
            });
        }

        const selectedProvider =
            provider || process.env.DEFAULT_PROVIDER || "claude";

        let reply = "";

        switch (selectedProvider.toLowerCase()) {
            case "claude":
                reply = await chatWithClaude({
                    message,
                    history,
                    model
                });
                break;

            case "openai":
                reply = await chatWithOpenAI({
                    message,
                    history,
                    model
                });
                break;

            case "gemini":
                reply = await chatWithGemini({
                    message,
                    history,
                    model
                });
                break;

            default:
                return res.status(400).json({
                    success: false,
                    error: "Unknown AI provider."
                });
        }

        res.json({
            success: true,
            provider: selectedProvider,
            response: reply,
            createdAt: new Date().toISOString()
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });

    }
});

export default router;
