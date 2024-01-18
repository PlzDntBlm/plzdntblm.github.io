import {GameLoop} from "./src/core/GameLoop.js";
import {GameObjectManager} from "./src/entities/GameObjectManager.js";
import {Player} from "./src/entities/Player.js";
import {Tile} from "./src/entities/Tile.js";
import {Scene} from "./src/scenes/Scene.js";
import {Tileset} from "./src/scenes/Tilemaps/Tileset.js";

class Game {
    constructor(px2d) {
        this.px2d = px2d;
        this.gameLoop = new GameLoop(px2d);
        this.gameObjectManager = new GameObjectManager();
        this.tileSet = {};
    }

    async Init() {
        await this.StartGameLoop();
    }

    async StartGameLoop() {
        // Load assets
        //await loadAssets();
        this.tileSet = await new Tileset(this.px2d);

        let scene = new Scene(this.px2d);


        // Initialize game entities

        // Initialize player
        this.player = new Player();
        this.player.px2d = this.px2d;
        this.player.transform.position.x = 16;
        this.player.transform.position.y = 16;
        this.gameObjectManager.addGameObject(this.player);

        // Initialize tiles

        this.gameObjectManager.addGameObjects(scene.tileMap);


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