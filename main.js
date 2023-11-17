import {CoreSystem} from "./src/scripts/CoreSystem.js";
import {ChatUI} from "./src/scripts/ChatUI.js";
import { TextAdventureGame } from './src/scripts/TextAdventureGame.js';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const outputDiv = document.getElementById('output');
    const chatUI = new ChatUI(userInput, outputDiv);

    const coreSystem = new CoreSystem(chatUI);
    const textAdventureGame = new TextAdventureGame(chatUI);

    coreSystem.loadGame(textAdventureGame);
});