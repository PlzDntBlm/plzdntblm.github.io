import {Program} from "./Program.js";

export class RockPaperScissors {
    constructor() {
        this.program = new Program("Rock Paper Scissors");
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
    Start(){
        this.program.ui.appendParagraphToOutput(`Welcome to Rock Paper Scissors!\n Let's play one round. Enter "rock" (r), "paper" (p) or "scissors" (s).`);
    }

    // Other game-specific methods
}
