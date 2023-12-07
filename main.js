import {CoreSystem} from "./src/scripts/CoreSystem.js";
import {ChatUI} from "./src/scripts/ChatUI.js";
import {Program} from './src/scripts/Program.js';
import {SpiritConductorTA} from './src/scripts/SpiritConductorTA.js';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');

    const coreSystem = new CoreSystem();

    const chatUI = new ChatUI(userInput, outputDiv, coreSystem);

    const spiritConductorTAGame = new SpiritConductorTA("Spirit Conductor");

    spiritConductorTAGame.setUI(chatUI);
    coreSystem.setUI(chatUI);
    coreSystem.addProgram([spiritConductorTAGame, new Program("Dummy Program 1"), new Program("Dummy Program 2")]);
});