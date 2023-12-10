import {CoreSystem} from "./src/scripts/CoreSystem.js";
import {ChatUI} from "./src/scripts/ChatUI.js";
import {Program} from './src/scripts/Program.js';
import {SpiritConductorTA} from './src/scripts/SpiritConductorTA.js';
import {RockPaperScissors} from "./src/scripts/RockPaperScissors.js";

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');
    const avatarImg = document.getElementById('avatarImg');

    const coreSystem = new CoreSystem();

    const chatUI = new ChatUI({userInput:userInput, outputDiv:outputDiv, coreSystem:coreSystem,avatarImg:avatarImg});

    const spiritConductorTAGame = new SpiritConductorTA();
    spiritConductorTAGame.setUI(chatUI);

    const rockPaperScissors = new RockPaperScissors();
    rockPaperScissors.setUI(chatUI)

    coreSystem.setUI(chatUI);
    coreSystem.addProgram([spiritConductorTAGame, rockPaperScissors, new Program("Dummy Program 1"), new Program("Dummy Program 2")]);
});