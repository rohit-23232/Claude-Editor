const chatWindow = document.getElementById("chatWindow");
const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");
const providerSelect = document.getElementById("provider");
const modelSelect = document.getElementById("model");

let chatHistory = [];

/* --------------------------
   Add Message
-------------------------- */

function addMessage(role, text) {

    const div = document.createElement("div");

    div.className = `message ${role}`;

    div.innerHTML = marked.parse(text);

    chatWindow.appendChild(div);

    chatWindow.scrollTop = chatWindow.scrollHeight;

}

/* --------------------------
   Typing Indicator
-------------------------- */

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message assistant";

    typing.id = "typing";

    typing.innerHTML = `
        <span>AI is thinking...</span>
    `;

    chatWindow.appendChild(typing);

    chatWindow.scrollTop = chatWindow.scrollHeight;

}

function hideTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

/* --------------------------
   Send Message
-------------------------- */

async function sendMessage() {

    const message = promptInput.value.trim();

    if (!message) return;

    addMessage("user", message);

    chatHistory.push({
        role: "user",
        content: message
    });

    promptInput.value = "";

    showTyping();

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                provider: providerSelect.value,

                model: modelSelect.value,

                message,

                history: chatHistory

            })

        });

        const data = await response.json();

        hideTyping();

        if (!data.success) {

            addMessage(
                "assistant",
                "❌ " + data.error
            );

            return;

        }

        addMessage(
            "assistant",
            data.response
        );

        chatHistory.push({

            role: "assistant",

            content: data.response

        });

    } catch (error) {

        hideTyping();

        addMessage(
            "assistant",
            "Connection error."
        );

        console.error(error);

    }

}

/* --------------------------
   Events
-------------------------- */

sendButton.addEventListener(
    "click",
    sendMessage
);

promptInput.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();

        }

    }
);

/* --------------------------
   New Chat
-------------------------- */

document
.getElementById("newChat")
.addEventListener("click", () => {

    chatHistory = [];

    chatWindow.innerHTML = "";

});
