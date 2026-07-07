/*
====================================
 AI Editor Voice
====================================
*/

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = e => {

        const transcript =
        e.results[0][0].transcript;

        prompt.value = transcript;

    };

    recognition.onerror = err => {

        console.error(err);

    };

}

function startVoice(){

    if(!recognition){

        alert("Speech Recognition not supported.");

        return;

    }

    recognition.start();

}

function stopVoice(){

    if(recognition){

        recognition.stop();

    }

}

console.log("Voice Ready");
