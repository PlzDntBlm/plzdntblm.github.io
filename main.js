import {CoreSystem} from "./src/scripts/CoreSystem.js";
import {ChatUI} from "./src/scripts/ChatUI.js";
import {Program} from './src/scripts/Program.js';
import {TextAdventureGame} from './src/scripts/TextAdventureGame.js';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');

    const coreSystem = new CoreSystem();

    const chatUI = new ChatUI(userInput, outputDiv, coreSystem);

    const myTextAdventureGame = new TextAdventureGame("Spirit Conductor");

    myTextAdventureGame.setUI(chatUI);
    coreSystem.setUI(chatUI);
    coreSystem.addProgram([myTextAdventureGame, new Program("Dummy Program 1"), new Program("Dummy Program 2")]);
});