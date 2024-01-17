import {Program} from "../Program.js";
import {startResizing} from "./styles/ResizeCanvas.js";
import {Game} from "./Game.js";

class Px2D {
    constructor() {
        this.program = new Program("Px 2D");
        this.game = null;
        this.context = null;
        this.assetsPath = "./src/scripts/px2d/src/assets/";
    }

    processCommand(command) {
        let userChoice = command.toLowerCase();
    }

    getName() {
        return this.program.getName();
    }

    setUI(chatUI) {
        this.program.setUI(chatUI);
    }

    async Start() {
        this.program.ui.appendParagraphToOutput(`Welcome to Px 2D!<br>Opened new Window.`, 'machineParagraph');
        // Call the function to add the overlay to the document
        this.setup().then(() => {
            this.game = new Game(this);
            this.game.Init();
        });
    }

    addOverlay() {
        this.program.ui.focusInput = false;
        this.program.ui.userInput.blur();
        // Create overlay element
        this.overlay = document.createElement("div");
        this.overlay.id = "px2d-overlay";

        // Create canvas element
        let canvas = document.createElement("canvas");
        canvas.id = "px2d-canvas";
        canvas.width = 256; // Set canvas width as needed
        canvas.height = 240; // Set canvas height as needed
        // Append canvas to the overlay
        this.overlay.appendChild(canvas);


        // Append overlay to the body
        //document.body.appendChild(this.overlay);
        const canvasDiv = document.querySelector("#canvas");
        canvasDiv.append(this.overlay);
        this.context = document.querySelector("#px2d-canvas").getContext("2d");

        startResizing();
    }

    async setup() {
        await this.addOverlay();
    }
}

export {Px2D}