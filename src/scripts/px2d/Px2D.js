import {Program} from "../Program.js";
import {GameLoop} from "./src/core/GameLoop.js";
import {startResizing} from "./styles/ResizeCanvas.js";

class Px2D {
    constructor() {
        this.program = new Program("Px 2D");
        this.canvas = undefined;
        this.gameLoop = undefined;
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

    Start() {
        this.program.ui.appendParagraphToOutput(`Welcome to Px 2D!<br>Opened new Window.`, 'machineParagraph');
        // Call the function to add the overlay to the document
        this.setup().then(() => {
            this.startGameLoop();
        });
    }

    addOverlay() {
        this.program.ui.focusInput = false;
        this.program.ui.userInput.blur();
        // Create overlay element
        this.overlay = document.createElement("div");
        this.overlay.id = "px2d-overlay";

        // Create canvas element
        this.canvas = document.createElement("canvas");
        this.canvas.id = "px2d-canvas";
        this.canvas.width = 400; // Set canvas width as needed
        this.canvas.height = 300; // Set canvas height as needed

        // Append canvas to the overlay
        this.overlay.appendChild(this.canvas);

        // Append overlay to the body
        document.body.appendChild(this.overlay);
        startResizing();
    }

    async setup() {
        this.addOverlay();
        // Load assets
        //await loadAssets();

        // Initialize game entities
        //const player = new Player();
        //const enemies = createEnemies();

        // Setup input handlers
        //setupInputHandling();

        // Initialize other necessary game components
        // ...

        // Start the game loop
    }

    startGameLoop() {
        // Instantiate and start the game loop
        this.gameLoop = new GameLoop(this);
    }
}

export {Px2D}