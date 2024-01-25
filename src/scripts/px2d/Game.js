import {GameLoop} from "./src/core/GameLoop.js";
import {GameObjectManager} from "./src/entities/GameObjectManager.js";
import {Player} from "./src/entities/Player.js";
import {Tile} from "./src/entities/Tile.js";
import {Scene} from "./src/scenes/Scene.js";
import {TileSet} from "./src/scenes/Tilemaps/TileSet.js";
import {AABB} from "./src/utils/collider/AABB.js";
import {GameObject} from "./src/entities/GameObject.js";

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
        this.player.solid = true;
        this.player.collider = new AABB(
            this.player.transform.position.x,
            this.player.transform.position.y,
            this.player.transform.sizeInPixel.x,
            this.player.transform.sizeInPixel.y);
        this.player.Init();

        this.gizmo = new GameObject();
        this.gizmo.renderer.fillColor = 'yellowgreen';
        this.gizmo.transform.position = {
            x: 128,
            y: 128
        }
    }

    StartGameLoop() {
        this.gameLoop.Init();
    }

    startGame() {
        let scene = new Scene(this.px2d);

        this.gameObjectManager.addGameObject(this.player);

        // Initialize tiles

        this.gameObjectManager.addGameObjects(scene.tileMap);
        //this.gameObjectManager.addGameObject(this.gizmo);
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