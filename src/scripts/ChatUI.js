import {getRandomInsult} from "./getRandomInsult.js";

export class ChatUI {
    // Responsibilities of ChatUI:
    //
    //     Capturing and forwarding user inputs to GameLogic.
    // Displaying responses and game state updates.
    // Managing UI elements like the chat history, input field, etc.
    // Handling UI-specific commands (like /clear).
    constructor(userInput, outputDiv) {
        this.userInput = userInput;
        this.outputDiv = outputDiv;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.userInput.addEventListener("keydown", async (event) => {
            if (event.key === "Enter") {
                await this.processInput();
            }
        });

        this.userInput.addEventListener("blur", () => {
            if (true) {  // Replace with your actual condition
                this.userInput.focus();
            }
        });

        this.userInput.addEventListener('input', (event) => {
            this.adjustTextareaHeight();
        }, false);


        // Other event listeners as needed
    }

    async processInput() {
        this.userInput.scrollIntoView();
        const inputValue = this.userInput.value.trim();

        if (inputValue === "") return;

        this.appendParagraphToOutput(inputValue, "userParagraph");

        let response;
        if (inputValue.startsWith("/")) {
            response = this.handleCustomCommand(inputValue);
        } else {
            response = await this.generateMachineAnswer(inputValue);
        }

        if (response !== null) {
            this.appendParagraphToOutput(response, "machineParagraph");
        }

        this.userInput.value = "";
    }

    appendParagraphToOutput(text, className) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = text;
        paragraph.className = className;
        this.outputDiv.appendChild(paragraph);
    }

    async generateMachineAnswer(userAnswer) {
        // Your existing logic for generating a machine answer
        // Example:
        switch (userAnswer.toLowerCase()) {
            case "hello":
            case "hi":
                return "Hello! How can I assist you?";
            case "goodbye":
            case "bye":
                return "Goodbye! Have a great day!";
            default:
                return getRandomInsult();
        }
    }

    handleCustomCommand(command) {
        // Handle custom commands with a slash prefix ("/")
        switch (command) {
            case "/help":
                return "Here are some available commands: /help, /clear";
            case "/clear":
            case "/clear chat":
            case "/cs":
            case "/clear screen":
                this.clearChat();
                return null;
            default:
                return "Command not recognized. Type /help for available commands.";
        }
    }

    clearChat() {
        this.outputDiv.innerHTML = '';
    }

    adjustTextareaHeight() {
        this.userInput.style.height = 'auto'; // Reset the height
        this.userInput.style.height = this.userInput.scrollHeight + 'px'; // Set to content height
    }
    scrollToBottom() {
        this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
    }

    // Other methods as needed...
}