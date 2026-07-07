/*
====================================
 AI Editor Export
====================================
*/

/* Export Markdown */

function exportMarkdown(){

    let md = "# AI Editor Chat\n\n";

    chatHistory.forEach(msg=>{

        md += `## ${msg.role}\n\n`;

        md += msg.content + "\n\n";

    });

    downloadFile(md,"chat.md","text/markdown");

}

/* Export TXT */

function exportText(){

    let text = "";

    chatHistory.forEach(msg=>{

        text += `[${msg.role.toUpperCase()}]\n`;

        text += msg.content + "\n\n";

    });

    downloadFile(text,"chat.txt","text/plain");

}

/* Export JSON */

function exportJSON(){

    const json = JSON.stringify(

        chatHistory,

        null,

        2

    );

    downloadFile(

        json,

        "chat.json",

        "application/json"

    );

}

/* Download Helper */

function downloadFile(content,name,type){

    const blob = new Blob(

        [content],

        {type}

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = name;

    a.click();

    URL.revokeObjectURL(url);

}

/* Copy Conversation */

function copyConversation(){

    let text = "";

    chatHistory.forEach(msg=>{

        text += `${msg.role}: ${msg.content}\n\n`;

    });

    navigator.clipboard.writeText(text);

    alert("Conversation copied.");

}

/* Print Chat */

function printConversation(){

    const w = window.open();

    w.document.write("<pre>");

    chatHistory.forEach(msg=>{

        w.document.write(

            `${msg.role}\n\n${msg.content}\n\n`

        );

    });

    w.document.write("</pre>");

    w.print();

    w.close();

}

console.log("Export Module Loaded");
