import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function chatWithGemini({
    message,
    history = [],
    model
}) {
    try {

        const chatHistory = [];

        // Convert previous conversation
        for (const item of history) {

            chatHistory.push({
                role: item.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: item.content
                    }
                ]
            });

        }

        const chat = ai.chats.create({
            model:
                model ||
                process.env.GEMINI_MODEL ||
                "gemini-2.5-pro",

            history: chatHistory
        });

        const response = await chat.sendMessage({
            message
        });

        return response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        throw new Error(
            error.message || "Gemini request failed."
        );

    }
}
