/*
====================================
 AI Editor Theme Manager
====================================
*/

const body = document.body;

const themeButton = document.querySelector(".bottomMenu button:nth-child(2)");

const STORAGE_KEY = "ai-editor-theme";

/* ====================================
   Apply Theme
==================================== */

function applyTheme(theme) {

    body.classList.remove(
        "dark",
        "light"
    );

    body.classList.add(theme);

    localStorage.setItem(
        STORAGE_KEY,
        theme
    );

}

/* ====================================
   Toggle Theme
==================================== */

function toggleTheme() {

    const current = body.classList.contains("light")
        ? "light"
        : "dark";

    const next = current === "dark"
        ? "light"
        : "dark";

    applyTheme(next);

}

/* ====================================
   Load Saved Theme
==================================== */

function loadTheme() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {

        applyTheme(saved);

        return;

    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {

        applyTheme("dark");

    } else {

        applyTheme("light");

    }

}

/* ====================================
   Listen for Button
==================================== */

if (themeButton) {

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}

/* ====================================
   Watch System Theme
==================================== */

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener("change", e => {

    if (!localStorage.getItem(STORAGE_KEY)) {

        applyTheme(
            e.matches
                ? "dark"
                : "light"
        );

    }

});

/* ====================================
   Initialize
==================================== */

loadTheme();

console.log("Theme Loaded");
