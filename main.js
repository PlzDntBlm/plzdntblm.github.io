import {CoreSystem} from "./src/scripts/CoreSystem.js";
import {ChatUI} from "./src/scripts/ChatUI.js";
import {Program} from './src/scripts/Program.js';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');

    const coreSystem = new CoreSystem();

    const textAdventureGame = new Program("Text Adventure Game");

    const chatUI = new ChatUI(userInput, outputDiv, coreSystem);

    textAdventureGame.setUI(chatUI);
    coreSystem.setUI(chatUI);
    coreSystem.addProgram([textAdventureGame, new Program("Dummy Program 1"), new Program("Dummy Program 2")]);
});