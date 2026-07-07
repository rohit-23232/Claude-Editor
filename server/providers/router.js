import { chatWithClaude } from "./claude.js";
import { chatWithOpenAI } from "./openai.js";
import { chatWithGemini } from "./gemini.js";

export const PROVIDERS = {
    claude: {
        name: "Anthropic Claude",
        defaultModel: process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514",
        models: [
            "claude-opus-4-1",
            "claude-sonnet-4",
            "claude-3-7-sonnet-latest",
            "claude-3-5-haiku-latest"
        ]
    },

    openai: {
        name: "OpenAI",
        defaultModel: process.env.OPENAI_MODEL || "gpt-5",
        models: [
            "gpt-5",
            "gpt-5-mini",
            "gpt-5-nano",
            "gpt-4.1"
        ]
    },

    gemini: {
        name: "Google Gemini",
        defaultModel: process.env.GEMINI_MODEL || "gemini-2.5-pro",
        models: [
            "gemini-2.5-pro",
            "gemini-2.5-flash"
        ]
    }
};

export function getProviders() {
    return PROVIDERS;
}

export function getProvider(provider) {
    return PROVIDERS[provider] || null;
}

export async function runAI({
    provider,
    model,
    message,
    history = []
}) {

    switch (provider) {

        case "claude":
            return await chatWithClaude({
                message,
                history,
                model
            });

        case "openai":
            return await chatWithOpenAI({
                message,
                history,
                model
            });

        case "gemini":
            return await chatWithGemini({
                message,
                history,
                model
            });

        default:
            throw new Error("Unsupported AI provider.");

    }

}
