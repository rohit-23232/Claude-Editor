/*
====================================
 AI Editor History Manager
====================================
*/

const HISTORY_STORAGE = "ai-editor-history";

/* ====================================
   Load History
==================================== */

function getHistory() {

    try {

        return JSON.parse(
            localStorage.getItem(HISTORY_STORAGE)
        ) || [];

    } catch {

        return [];

    }

}

/* ====================================
   Save History
==================================== */

function saveHistory(history) {

    localStorage.setItem(
        HISTORY_STORAGE,
        JSON.stringify(history)
    );

}

/* ====================================
   Add Conversation
==================================== */

function addConversation(messages, provider, model) {

    if (!messages.length) return;

    const history = getHistory();

    const title =
        messages[0].content.substring(0, 40) ||
        "New Chat";

    history.unshift({

        id: crypto.randomUUID(),

        title,

        provider,

        model,

        favorite: false,

        createdAt: new Date().toISOString(),

        messages

    });

    saveHistory(history);

    renderConversationList();

}

/* ====================================
   Delete Conversation
==================================== */

function deleteConversation(id) {

    const history = getHistory().filter(
        chat => chat.id !== id
    );

    saveHistory(history);

    renderConversationList();

}

/* ====================================
   Rename Conversation
==================================== */

function renameConversation(id, title) {

    const history = getHistory();

    const chat = history.find(
        c => c.id === id
    );

    if (!chat) return;

    chat.title = title;

    saveHistory(history);

    renderConversationList();

}

/* ====================================
   Toggle Favorite
==================================== */

function toggleFavorite(id) {

    const history = getHistory();

    const chat = history.find(
        c => c.id === id
    );

    if (!chat) return;

    chat.favorite = !chat.favorite;

    saveHistory(history);

    renderConversationList();

}

/* ====================================
   Load Conversation
==================================== */

function openConversation(id) {

    const history = getHistory();

    const chat = history.find(
        c => c.id === id
    );

    if (!chat) return;

    chatHistory = [...chat.messages];

    chatWindow.innerHTML = "";

    chat.messages.forEach(msg => {

        addMessage(
            msg.role,
            msg.content
        );

    });

}

/* ====================================
   Search
==================================== */

function searchHistory(query) {

    const cards = document.querySelectorAll(
        ".history-card"
    );

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        card.style.display =
            text.includes(query.toLowerCase())
                ? ""
                : "none";

    });

}

/* ====================================
   Render Sidebar
==================================== */

function renderConversationList() {

    historyList.innerHTML = "";

    const history = getHistory();

    history.forEach(chat => {

        const li =
            document.createElement("li");

        li.className = "history-card";

        li.innerHTML = `
            <strong>${chat.favorite ? "⭐ " : ""}${chat.title}</strong>
            <br>
            <small>${chat.provider} • ${chat.model}</small>
        `;

        li.onclick = () =>
            openConversation(chat.id);

        li.oncontextmenu = e => {

            e.preventDefault();

            const action = prompt(
`Choose:
1 = Rename
2 = Delete
3 = Favorite`
            );

            if (action === "1") {

                const title = prompt(
                    "New title:"
                );

                if (title)
                    renameConversation(
                        chat.id,
                        title
                    );

            }

            if (action === "2") {

                if (confirm("Delete chat?"))

                    deleteConversation(chat.id);

            }

            if (action === "3") {

                toggleFavorite(chat.id);

            }

        };

        historyList.appendChild(li);

    });

}

/* ====================================
   Export JSON
==================================== */

function exportHistory() {

    const blob = new Blob(

        [
            JSON.stringify(
                getHistory(),
                null,
                2
            )
        ],

        {
            type:"application/json"
        }

    );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "history.json";

    a.click();

    URL.revokeObjectURL(url);

}

/* ====================================
   Import JSON
==================================== */

function importHistory(file) {

    const reader = new FileReader();

    reader.onload = () => {

        try{

            const data =
                JSON.parse(reader.result);

            saveHistory(data);

            renderConversationList();

        }

        catch{

            alert("Invalid file.");

        }

    };

    reader.readAsText(file);

}

/* ====================================
   Startup
==================================== */

renderConversationList();

console.log("History Manager Loaded");
