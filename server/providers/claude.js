import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

export async function chatWithClaude({
    message,
    history = [],
    model
}) {

    try {

        const messages = [];

        // Previous conversation
        for (const item of history) {

            if (item.role === "user") {
                messages.push({
                    role: "user",
                    content: item.content
                });
            }

            if (item.role === "assistant") {
                messages.push({
                    role: "assistant",
                    content: item.content
                });
            }

        }

        // Current message
        messages.push({
            role: "user",
            content: message
        });

        const response = await anthropic.messages.create({

            model:
                model ||
                process.env.CLAUDE_MODEL ||
                "claude-sonnet-4-20250514",

            max_tokens: Number(
                process.env.MAX_TOKENS || 4096
            ),

            temperature: Number(
                process.env.TEMPERATURE || 0.7
            ),

            system:
                "You are AI Editor, a helpful, intelligent and professional AI assistant. Answer clearly using Markdown when appropriate.",

            messages

        });

        return response.content[0].text;

    } catch (error) {

        console.error("Claude Error:", error);

        throw new Error(
            error.message || "Claude request failed."
        );

    }

}
