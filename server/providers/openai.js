import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function chatWithOpenAI({
    message,
    history = [],
    model
}) {
    try {

        const messages = [
            {
                role: "system",
                content:
                    "You are AI Editor, a professional AI assistant. Reply clearly using Markdown when appropriate."
            }
        ];

        // Previous conversation
        for (const item of history) {
            messages.push({
                role: item.role,
                content: item.content
            });
        }

        // Current user message
        messages.push({
            role: "user",
            content: message
        });

        const response = await openai.chat.completions.create({

            model:
                model ||
                process.env.OPENAI_MODEL ||
                "gpt-5",

            messages,

            temperature: Number(
                process.env.TEMPERATURE || 0.7
            ),

            max_completion_tokens: Number(
                process.env.MAX_TOKENS || 4096
            )

        });

        return response.choices[0].message.content;

    } catch (error) {

        console.error("OpenAI Error:", error);

        throw new Error(
            error.message || "OpenAI request failed."
        );

    }
}
