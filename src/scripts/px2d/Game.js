import {GameLoop} from "./src/core/GameLoop.js";

class Game {
    constructor(px2d) {
        this.gameLoop = new GameLoop(px2d);
    }

    Init(){
        this.StartGameLoop();
    }
    StartGameLoop() {
        // Load assets
        //await loadAssets();

        // Initialize game entities
        //const player = new Player();
        //const enemies = createEnemies();

        // Setup input handlers
        //setupInputHandling();

        // Initialize other necessary game components
        // ...

        // Instantiate and start the game loop
        this.gameLoop = new GameLoop(this);
    }
}
export {Game}