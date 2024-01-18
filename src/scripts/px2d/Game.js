import {GameLoop} from "./src/core/GameLoop.js";
import {GameObjectManager} from "./src/entities/GameObjectManager.js";
import {Player} from "./src/entities/Player.js";
import {Tile} from "./src/entities/Tile.js";

class Game {
    constructor(px2d) {
        this.px2d = px2d;
        this.gameLoop = new GameLoop(px2d);
        this.gameObjectManager = new GameObjectManager();
    }

    Init() {
        this.StartGameLoop();
    }

    StartGameLoop() {
        // Load assets
        //await loadAssets();

        // Initialize game entities

        // Initialize player
        this.player = new Player();
        this.player.px2d = this.px2d;
        this.player.transform.position.x = 16;
        this.player.transform.position.y = 16;
        this.gameObjectManager.addGameObject(this.player);

        // Initialize tiles
        let tile = new Tile();
        tile.px2d = this.px2d;
        tile.setTileType(0);
        tile.tile.position.col = 1;
        tile.tile.position.row = 2;
        this.gameObjectManager.addGameObject(tile);


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