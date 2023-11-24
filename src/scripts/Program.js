export class Program {
    constructor(name) {
        this.programName = name;
        // Game initialization...
    }

    async processCommand(command) {
        // Handle game-specific commands
        return (`Program Command Processed in: ${this.programName}`);
    }

    setUI(coreSystem) {
        this.coreSystem = coreSystem;
    }

    getName() {
        return this.programName;
    }

    // Other game-specific methods...
}