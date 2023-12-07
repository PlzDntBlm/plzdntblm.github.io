import {Program} from "./Program.js";

export class SpiritConductorTA {
    constructor() {
        this.program = new Program("Spirit Conductor TA");
        // Other game-specific initializations
    }

    processCommand(command) {
        // Game-specific command logic
        // You can also delegate to the program instance
        return this.program.processCommand(command);
    }

    getName() {
        return this.program.getName();
    }
    setUI(chatUI){
        this.program.setUI(chatUI);
    }

    // Other game-specific methods
}
