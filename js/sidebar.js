/*
====================================
 AI Editor Sidebar
====================================
*/

const sidebar = document.querySelector(".sidebar");
const historyList = document.getElementById("historyList");
const newChatBtn = document.getElementById("newChat");

/* ====================================
   Mobile Sidebar Toggle
==================================== */

const toggleButton = document.createElement("button");

toggleButton.className = "sidebarToggle";

toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';

document.body.appendChild(toggleButton);

toggleButton.addEventListener("click", () => {

    sidebar.classList.toggle("show");

});

/* ====================================
   Create History Item
==================================== */

function createHistoryItem(chat) {

    const li = document.createElement("li");

    li.className = "historyItem";

    li.dataset.id = chat.id;

    li.innerHTML = `
        <div class="historyTitle">${chat.title}</div>
        <div class="historyDate">${chat.created}</div>
    `;

    li.addEventListener("click", () => {

        loadChat(chat.id);

        if (window.innerWidth < 900) {
            sidebar.classList.remove("show");
        }

    });

    return li;

}

/* ====================================
   Refresh Sidebar
==================================== */

function refreshSidebar() {

    historyList.innerHTML = "";

    chats.forEach(chat => {

        historyList.appendChild(
            createHistoryItem(chat)
        );

    });

}

/* ====================================
   Search History
==================================== */

const searchInput = document.createElement("input");

searchInput.placeholder = "Search chats...";

searchInput.className = "historySearch";

document
.querySelector(".history")
.prepend(searchInput);

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value
        .toLowerCase()
        .trim();

    const items = historyList.querySelectorAll("li");

    items.forEach(item => {

        const title = item.innerText.toLowerCase();

        item.style.display =
            title.includes(keyword)
            ? "block"
            : "none";

    });

});

/* ====================================
   Delete History
==================================== */

function deleteChat(id) {

    chats = chats.filter(c => c.id !== id);

    localStorage.setItem(
        "ai-editor-history",
        JSON.stringify(chats)
    );

    refreshSidebar();

}

/* ====================================
   Context Menu
==================================== */

historyList.addEventListener("contextmenu", e => {

    e.preventDefault();

    const li = e.target.closest("li");

    if (!li) return;

    const id = Number(li.dataset.id);

    if (confirm("Delete this chat?")) {

        deleteChat(id);

    }

});

/* ====================================
   New Chat Animation
==================================== */

newChatBtn.addEventListener("click", () => {

    newChatBtn.classList.add("pulse");

    setTimeout(() => {

        newChatBtn.classList.remove("pulse");

    }, 400);

});

/* ====================================
   Responsive
==================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        sidebar.classList.remove("show");

    }

});

/* ====================================
   Initialize
==================================== */

refreshSidebar();

console.log("Sidebar Loaded");
