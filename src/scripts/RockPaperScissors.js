import {Program} from "./Program.js";

export class RockPaperScissors {
    constructor() {
        this.program = new Program("Rock Paper Scissors");
        // Other game-specific initializations
    }

    processCommand(command) {
        let userChoice = command.toLowerCase();

        if(userChoice === 'r'){
            userChoice = 'rock';
        }
        else if(userChoice === 'p'){
            userChoice = 'paper';
        }
        else if(userChoice === 's'){
            userChoice = 'scissors';
        }

        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        let result;
        if (userChoice === 'rock' || userChoice === 'paper' || userChoice === 'scissors') {
            if (userChoice === computerChoice) {
                result = 'It\'s a tie!';
            } else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
                (userChoice === 'scissors' && computerChoice === 'paper') ||
                (userChoice === 'paper' && computerChoice === 'rock')) {
                result = 'You win!';
            } else {
                result = 'You lose!';
            }
        } else {
           return 'Invalid input. Please enter "rock", "paper", or "scissors".';
        }

        return(`You chose ${userChoice}, computer chose ${computerChoice}. ${result}`);
    }

    getName() {
        return this.program.getName();
    }
    setUI(chatUI){
        this.program.setUI(chatUI);
    }
    Start(){
        this.program.ui.appendParagraphToOutput(`Welcome to Rock Paper Scissors!</br> Let's play one round. Enter "rock" (r), "paper" (p) or "scissors" (s).`);
    }

    // Other game-specific methods
}
