import {GameLoop} from "./src/core/GameLoop.js";
import {GameObjectManager}
    from "./src/entities/GameObjectManager.js";
import {Player} from "./src/entities/Player.js";

class Game {
    constructor(px2d) {
        this.px2d = px2d;
        this.gameLoop = new GameLoop(px2d);
        this.gameObjectManager = new GameObjectManager();
    }

    Init(){
        this.StartGameLoop();

    }
    StartGameLoop() {
        // Load assets
        //await loadAssets();

        // Initialize game entities
        this.player = new Player();
        this.player.px2d = this.px2d;
        this.player.transform.position.x = 32;
        this.player.transform.position.y = 32;
        this.player.transform.sizeInPixel.x = 16;
        this.player.transform.sizeInPixel.y = 16;
        this.gameObjectManager.addGameObject(this.player)

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