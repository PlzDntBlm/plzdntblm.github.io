import {getRandomInsult} from "./getRandomInsult.js";

export class ChatUI {
    // Responsibilities of ChatUI:
    //
    //     Capturing and forwarding user inputs to ProgramLogic.
    // Displaying responses and program state updates.
    // Managing UI elements like the chat history, input field, etc.
    // Handling UI-specific commands (like /clear).
    constructor(userInput, outputDiv, coreSystem) {
        this.userInput = userInput;
        this.outputDiv = outputDiv;
        this.coreSystem = coreSystem;
        this.initializeEventListeners();
        this.appendParagraphToOutput("INFORMATION! There is no game as of now. I only crated an environment where one can start/quit programs and use certain commands. I intend to expand this web-app and iterate and integrate every new learnt feature from upcoming lectures.", "machineParagraph");
    }

    initializeEventListeners() {
        this.userInput.addEventListener("keydown", async (event) => {
            // prevent newline
            if (event.keyCode == 13) {
                // prevent default behavior
                event.preventDefault();
            }
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

        // Check if the command starts with "/"
        if (inputValue.startsWith("/")) {
            response = await this.coreSystem.handleSystemCommand(inputValue);
        }
        // Delegate to the active program if it's not a system command
        else if (this.coreSystem.activeProgram === this.coreSystem) {
            response = await this.coreSystem.processCommand(inputValue);
        }
        else if (this.coreSystem.currentFocus) {
            response = await this.coreSystem.currentFocus.processCommand(inputValue);
        } else {
            response = "NOTHING IN FOCUS - FOCUS RESET TO CORE SYSTEM";
            this.coreSystem.currentFocus = this.coreSystem;
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
    appendImageToOutput(imageUrl){
        const imageParagraph = document.createElement('div');
        imageParagraph.className = 'imageParagraph'; // Assign a class for styling

        const image = new Image();
        image.src = imageUrl;
        image.alt = "Loaded image";
        image.className = "imageParagraphImage"; // for styling purposes
        imageParagraph.appendChild(image);
        this.outputDiv.appendChild(imageParagraph);
    }

    isSystemCommand(input) {
        // Implement logic to determine if the command is a system-level command
        return input.startsWith("/");
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
}