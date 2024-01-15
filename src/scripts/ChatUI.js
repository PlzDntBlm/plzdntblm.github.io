import {getRandomInsult} from "./getRandomInsult.js";

export class ChatUI {
    // Responsibilities of ChatUI:
    //
    //     Capturing and forwarding user inputs to ProgramLogic.
    // Displaying responses and program state updates.
    // Managing UI elements like the chat history, input field, etc.
    // Handling UI-specific commands (like /clear).
    focusInput = true;
    constructor({userInput, outputDiv, coreSystem, avatarImg}) {
        this.userInput = userInput;
        this.outputDiv = outputDiv;
        this.coreSystem = coreSystem;
        this.avatarImg = avatarImg;
        this.initializeEventListeners();
        this.appendParagraphToOutput("INFORMATION! There is not much functionality as of now. I intend to expand this web-app and iterate and integrate every new learnt feature from upcoming lectures.", "machineParagraph",this.coreSystem.getName());
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

        /*if(this.focusInput) {
            this.userInput.addEventListener("blur", () => {
                this.userInput.focus();
            });
        }*/

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

    appendParagraphToOutput(text, className, attribute) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = text;
        paragraph.className = className;
        paragraph.setAttribute("data-program-name", `${attribute ? attribute : this.coreSystem.currentFocus.getName()}>`);
        this.outputDiv.appendChild(paragraph);
    }
    appendImageToOutput(imageUrl, attribute){
        const imageParagraph = document.createElement('div');
        imageParagraph.className = 'imageParagraph'; // Assign a class for styling

        const image = new Image();
        image.src = imageUrl;
        image.alt = "Loaded image";
        image.className = "imageParagraphImage"; // for styling purposes
        imageParagraph.appendChild(image);
        this.outputDiv.appendChild(imageParagraph);
    }
    setAvatarImage(imageUrl,alt){
        this.avatarImg.src = imageUrl;
        this.avatarImg.alt = alt;
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