import {getRandomInsult} from "./getRandomInsult.js";

export class CoreSystem {
    constructor() {
        this.activeProgram = null;
        this.currentFocus = this;
        this.programName = "Core System";
        this.programs = [];
        this.commands = {
            "/help": "Display available commands",
            "/clear": "Clear the chat",
            "/ls focus": "Show program in focus",
            "/ls programs": "List available programs",
            // Add more commands and descriptions as needed
        };
        // Initialization code...
    }

    async processCommand(command) {
        // Handle system-level commands
        return this.handleSystemCommand(command);
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

    handleSystemCommand(command) {
        // Handle custom commands with a slash prefix ("/")
        switch (command) {
            case "/help":
                let helpMessage = "Here are some available commands:<br>";
                for (const cmd in this.commands) {
                    helpMessage += `${cmd}: ${this.commands[cmd]}\<br>`;
                }
                return helpMessage.trim();
            case "/clear":
            case "/clear chat":
            case "/cs":
            case "/clear screen":
                this.ChatUI.clearChat();
                return null;
            case "/ls focus":
            case "/show focus":
            case "/current app":
            case "/status":
            case "/which app":
            case "/active":
                return this.currentFocus.getName();
            case "/ls programs":
            case "/show programs":
            case "/programs":
                if (this.programs.length === 0) {
                    return "No programs available."
                } else {
                    return this.programs.map(program => program.getName()).join('<br>');
                }
            case command.toLowerCase().split(/[ ,]+/)[0].startsWith('/start'):
                return "Tried to start something beautiful."
            default:
                return "Command not recognized. Type /help for available commands.";
        }
    }

    loadProgram(program) {
        this.activeProgram = program;
        // Code to load and initialize program
    }

    addProgram(programs) {
        for (const program of programs) {
            this.programs.push(program);
        }
    }

    setUI(ChatUI) {
        this.ChatUI = ChatUI;
    }

    getName() {
        return this.programName;
    }

    // Other system-level methods...
}