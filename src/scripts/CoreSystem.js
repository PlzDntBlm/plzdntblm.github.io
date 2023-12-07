import {getRandomInsult} from "./getRandomInsult.js";

export class CoreSystem {
    constructor() {
        this.activeProgram = this;
        this.currentFocus = this;
        this.programName = "Core System";
        this.programs = [];
        this.commands = {
            "/help": "Display available commands",
            "/clear": "Clear the chat",
            "/ls focus": "Show the program currently in focus",
            "/ls programs": "List all available programs",
            "/start [program]": "Start a specific program by name",
            /*"/exit": "Exit the current program",
            "/status": "Show the current status of the system",
            "/save": "Save the current state of the program",
            "/load [state]": "Load a saved state of the program",
            "/settings": "View or change system settings",
            "/about": "Display information about the system",*/
            "/insult": "Get insulted"
            // Add more commands and descriptions as needed
        };
        // Initialization code...
    }

    async processCommand(command) {
        // Handle system-level commands
        if (command ==="img"){
            this.ChatUI.appendImageToOutput('https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png')
        }
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

    async handleSystemCommand(fullCommand) {
        const parts = fullCommand.split(/[ ,]+/);
        const command = parts[0].toLowerCase();

        switch (command) {
            case "/help":
                let helpMessage = "Here are some available commands:<br>";
                for (const cmd in this.commands) {
                    helpMessage += `${cmd}: ${this.commands[cmd]}<br>`;
                }
                return helpMessage.trim();

            case "/clear":
                // Handle "/clear", "/clear chat", "/cs", "/clear screen"
                if (parts.length === 1 || parts.includes("chat") || parts.includes("cs") || parts.includes("screen")) {
                    this.ChatUI.clearChat();
                    return null;
                }
                break;
            case "/insult":
                return await getRandomInsult();
            case "/ls":
            case "/focus":
            case "/show":
                if (parts.includes("focus")) {
                    // Handle "/ls focus", "/show focus", etc.
                    return this.currentFocus ? this.currentFocus.getName() : "No focus set.";
                } else if (parts.includes("programs") || parts.slice(1).length === 0) {
                    // Handle "/ls programs", "/show programs", etc.
                    if (this.programs.length === 0) {
                        return "No programs available."
                    } else {
                        return this.programs.map(program => program.getName()).join('<br>');
                    }
                }
                break;
            case "/start":
            case "/s":
                if (parts.length > 1) {
                    const programName = parts.slice(1).join(" "); // Get the rest of the command as the program name
                    const programToStart = this.programs.find(p => p.getName().toLowerCase() === programName.toLowerCase());
                    if (programToStart) {
                        this.startProgram(programToStart);
                        return `Started ${programToStart.getName()}. </br> Quit program with "/quit".`;
                    } else {
                        return `Program ${programName} not found.`;
                    }
                } else {
                    return `Please specify a program to start. </br> Check available programs with "/ls programs".`;
                }
            case "/quit":
            case "/q":
                return this.endProgram();
            default:
                return `Command not recognized. Type /help for available commands.`;
        }
    }

    startProgram(program) {
        this.activeProgram = program;
        this.currentFocus = program;
        // Code to load and initialize program
    }
    endProgram(){
        if(this.activeProgram === this){
            return `No program running to be ended.`;
        }else {
            let msg = `Ended "${this.activeProgram}". </br>Switched back to ${this.getName()}.`;
            this.activeProgram = this;
            this.currentFocus = this;
            return msg;
        }
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