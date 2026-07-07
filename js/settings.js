/*
====================================
 AI Editor Settings
====================================
*/

const SETTINGS_KEY = "ai-editor-settings";

const DEFAULT_SETTINGS = {
    provider: "claude",
    model: "claude-sonnet-4-20250514",
    theme: "dark",
    accent: "purple",
    temperature: 0.7,
    maxTokens: 4096
};

/* Load Settings */

function loadSettings() {

    const saved = JSON.parse(
        localStorage.getItem(SETTINGS_KEY)
    );

    return saved || DEFAULT_SETTINGS;

}

/* Save Settings */

function saveSettings(settings) {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}

/* Apply Settings */

function applySettings() {

    const settings = loadSettings();

    provider.value = settings.provider;

    loadModels(settings.provider);

    model.value = settings.model;

    document.body.classList.remove(
        "purple",
        "blue",
        "green",
        "red"
    );

    document.body.classList.add(
        settings.accent
    );

}

/* Update Provider */

function updateProvider(value){

    const settings = loadSettings();

    settings.provider = value;

    saveSettings(settings);

}

/* Update Model */

function updateModel(value){

    const settings = loadSettings();

    settings.model = value;

    saveSettings(settings);

}

/* Reset */

function resetSettings(){

    localStorage.removeItem(SETTINGS_KEY);

    applySettings();

    alert("Settings reset.");

}

provider.addEventListener("change",()=>{

    updateProvider(provider.value);

});

model.addEventListener("change",()=>{

    updateModel(model.value);

});

applySettings();

console.log("Settings Loaded");
