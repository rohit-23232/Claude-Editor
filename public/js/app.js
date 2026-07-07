/*
====================================
 AI Editor
 Main Application
====================================
*/

const historyList = document.getElementById("historyList");
const prompt = document.getElementById("prompt");
const provider = document.getElementById("provider");
const model = document.getElementById("model");

let chats = JSON.parse(localStorage.getItem("ai-editor-history")) || [];

/* ====================================
   Auto Resize Textarea
==================================== */

prompt.addEventListener("input", () => {

    prompt.style.height = "auto";

    prompt.style.height = prompt.scrollHeight + "px";

});

/* ====================================
   Save Chat
==================================== */

function saveCurrentChat() {

    if (chatHistory.length === 0) return;

    chats.unshift({

        id: Date.now(),

        title: chatHistory[0].content.substring(0, 35),

        provider: provider.value,

        model: model.value,

        created: new Date().toLocaleString(),

        messages: [...chatHistory]

    });

    if (chats.length > 50) {

        chats.pop();

    }

    localStorage.setItem(
        "ai-editor-history",
        JSON.stringify(chats)
    );

    renderHistory();

}

/* ====================================
   Load Chat
==================================== */

function loadChat(id) {

    const chat = chats.find(c => c.id === id);

    if (!chat) return;

    chatHistory = [...chat.messages];

    chatWindow.innerHTML = "";

    chatHistory.forEach(msg => {

        addMessage(msg.role, msg.content);

    });

}

/* ====================================
   Render Sidebar History
==================================== */

function renderHistory() {

    historyList.innerHTML = "";

    chats.forEach(chat => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${chat.title}</strong><br>
            <small>${chat.provider}</small>
        `;

        li.onclick = () => loadChat(chat.id);

        historyList.appendChild(li);

    });

}

/* ====================================
   Export Chat
==================================== */

function exportMarkdown() {

    let md = "# AI Editor Chat\n\n";

    chatHistory.forEach(msg => {

        md += `## ${msg.role}\n\n`;

        md += msg.content + "\n\n";

    });

    const blob = new Blob([md], {

        type: "text/markdown"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "chat.md";

    a.click();

    URL.revokeObjectURL(url);

}

/* ====================================
   Copy Last AI Response
==================================== */

function copyLastAnswer() {

    const answers = chatHistory.filter(

        m => m.role === "assistant"

    );

    if (answers.length === 0) return;

    navigator.clipboard.writeText(

        answers[answers.length - 1].content

    );

    alert("Copied!");

}

/* ====================================
   New Chat
==================================== */

document
.getElementById("newChat")
.addEventListener("click", () => {

    if (chatHistory.length > 0) {

        saveCurrentChat();

    }

    chatHistory = [];

    chatWindow.innerHTML = "";

});

/* ====================================
   Keyboard Shortcuts
==================================== */

document.addEventListener("keydown", e => {

    if (e.ctrlKey && e.key === "s") {

        e.preventDefault();

        saveCurrentChat();

    }

    if (e.ctrlKey && e.key === "e") {

        e.preventDefault();

        exportMarkdown();

    }

});

/* ====================================
   Restore History
==================================== */

renderHistory();

console.log("AI Editor Ready");
