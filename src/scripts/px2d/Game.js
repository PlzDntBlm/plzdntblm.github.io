import {GameLoop} from "./src/core/GameLoop.js";
import {GameObjectManager} from "./src/entities/GameObjectManager.js";
import {Player} from "./src/entities/Player.js";
import {Tile} from "./src/entities/Tile.js";
import {Scene} from "./src/scenes/Scene.js";
import {TileSet} from "./src/scenes/Tilemaps/TileSet.js";

class Game {
    constructor(px2d) {
        console.log("Constructing Game");
        this.px2d = px2d;
        this.gameLoop = new GameLoop();
        this.tileSet = {};
        this.assetsLoaded = false;
        Game.Instance = this;
    }

    static Instance = {}

    async Init() {
        this.gameObjectManager = await new GameObjectManager();
        await this.loadAssets();
        console.log("Assets Loaded");
        this.assetsLoaded = true;
        this.startGame();
    }

    async loadAssets() {
        console.log("Loading Assets")
        // Load assets
        this.tileSet = new TileSet();
        await this.tileSet.loadTilesetFromFile();
        // Initialize game entities

        // Initialize player
        this.player = new Player();
        this.player.transform.position.x = 16 * 3.5;
        this.player.transform.position.y = 16 * 7;
        this.player.Init();
    }

    StartGameLoop() {
        this.gameLoop.Init();
    }

    startGame() {
        let scene = new Scene(this.px2d);

        this.gameObjectManager.addGameObject(this.player);

        // Initialize tiles

        this.gameObjectManager.addGameObjects(scene.tileMap);

        console.log("Loaded GameObjects");

        //const enemies = createEnemies();

        // Setup input handlers
        //setupInputHandling();

        // Initialize other necessary game components
        // ...

        // Instantiate and start the game loop

        this.StartGameLoop();
    }
}

export {Game}