/*
====================================
 AI Editor - Models
====================================
*/

const MODELS = {

    claude: [
        {
            name: "Claude Sonnet 4",
            value: "claude-sonnet-4-20250514"
        },
        {
            name: "Claude Opus 4.1",
            value: "claude-opus-4-1"
        },
        {
            name: "Claude 3.7 Sonnet",
            value: "claude-3-7-sonnet-latest"
        },
        {
            name: "Claude 3.5 Haiku",
            value: "claude-3-5-haiku-latest"
        }
    ],

    openai: [
        {
            name: "GPT-5",
            value: "gpt-5"
        },
        {
            name: "GPT-5 Mini",
            value: "gpt-5-mini"
        },
        {
            name: "GPT-5 Nano",
            value: "gpt-5-nano"
        },
        {
            name: "GPT-4.1",
            value: "gpt-4.1"
        }
    ],

    gemini: [
        {
            name: "Gemini 2.5 Pro",
            value: "gemini-2.5-pro"
        },
        {
            name: "Gemini 2.5 Flash",
            value: "gemini-2.5-flash"
        }
    ]

};

/*
====================================
 Populate Models
====================================
*/

function loadModels(provider) {

    model.innerHTML = "";

    const list = MODELS[provider];

    list.forEach(item => {

        const option = document.createElement("option");

        option.value = item.value;

        option.textContent = item.name;

        model.appendChild(option);

    });

}

/*
====================================
 Provider Changed
====================================
*/

provider.addEventListener("change", () => {

    loadModels(provider.value);

});

/*
====================================
 Startup
====================================
*/

loadModels(provider.value);
