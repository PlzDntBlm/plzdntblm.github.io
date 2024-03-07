import {handleGameCommand, startGame} from "./src/core/game.js";

export let htmlElements = {};
document.addEventListener('DOMContentLoaded', () => {
    htmlElements = {
        userInput: document.getElementById('userInput'),
        outputDiv: document.getElementById('output')
    };

    init();
});

function init() {
    initializeEventListeners();
    startGame();
}

function initializeEventListeners() {
    document.addEventListener("keydown", async (event) => {
        htmlElements.userInput.scrollIntoView();
        htmlElements.userInput.focus();
        // prevent newline
        if (event.keyCode == 13) {
            // prevent default behavior
            event.preventDefault();
        }
        if (event.key === "Enter") {
            readInput();
        }
    });
    htmlElements.userInput.addEventListener('input', (event) => {
        adjustTextareaHeight();
    }, false);
}

function readInput() {
    const inputValue = htmlElements.userInput.value.trim();

    if (inputValue === "") return;

    appendToOutput({innerHTML: inputValue, attr: "Player"});
    handleGameCommand(inputValue);
    htmlElements.userInput.value = "";
    scrollToBottom();
}

export function appendToOutput(obj = {}) {
    obj.innerHTML = obj.innerHTML || null;
    obj.type = obj.type || "default";
    obj.attr = obj.attr || "Game";
    obj.class = obj.class || "machineParagraph";
    obj.image = obj.image || null;

    if (obj.image) {
        const imageParagraph = document.createElement('div');
        imageParagraph.className = 'imageParagraph';
        const img = document.createElement('img');
        img.src = obj.image;
        img.className = 'imageParagraphImage';

        htmlElements.outputDiv.appendChild(imageParagraph);
        imageParagraph.appendChild(img);
    }
    if (obj.innerHTML) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = obj.innerHTML;
        paragraph.className = obj.class;
        paragraph.setAttribute("data-program-name", `${obj.attr}>`);
        htmlElements.outputDiv.appendChild(paragraph);
    }
    scrollToBottom();
}

function clearChat() {
    htmlElements.outputDiv.innerHTML = '';
}

function scrollToBottom() {
    //htmlElements.outputDiv.scrollTop = htmlElements.outputDiv.scrollHeight;
    htmlElements.userInput.scrollIntoView();
}

function adjustTextareaHeight() {
    htmlElements.userInput.style.height = 'auto'; // Reset the height
    htmlElements.userInput.style.height = htmlElements.userInput.scrollHeight + 'px'; // Set to content height
}