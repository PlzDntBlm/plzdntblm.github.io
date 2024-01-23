import {TileSet} from "../scenes/Tilemaps/TileSet.js";
import {Game} from "../../Game.js";
import {Px2D} from "../../Px2D.js";

export class GameLoop {
    constructor() {
        this.lastRenderTime = 0;
        this.accumulatedTime = 0;
        this.fixedTimeStep = 1000 / 60; // 60 updates per second
        console.log("Constructed GameLoop")
    }

    static FrameCounter = 0;

    GameLoop(timestamp) {
        let deltaTime = timestamp - this.lastRenderTime;
        this.lastRenderTime = timestamp;
        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.fixedTimeStep) {
            //this.FixedUpdate(this.fixedTimeStep);
            this.accumulatedTime -= this.fixedTimeStep;
        }

        this.Update(deltaTime);
        this.Render();

        requestAnimationFrame((timestamp) => this.GameLoop(timestamp));
    }

    Update(deltaTime) {
        // Update game entities and logic based on variable deltaTime
        if (Game)
            Game.Instance.gameObjectManager.UpdateGameObjects(deltaTime);
    }

    FixedUpdate(fixedDeltaTime) {
        // Consistent update logic, independent of frame rate
        Game.Instance.gameObjectManager.FixedUpdateGameObjects(fixedDeltaTime);
    }

    Render() {
        GameLoop.FrameCounter++;
        // Clear canvas and draw game entities
        Px2D.Instance.context.clearRect(0, 0, Px2D.Instance.overlay.firstChild.width, Px2D.Instance.overlay.firstChild.height);
        Game.Instance.gameObjectManager.RenderGameObjects(Px2D);
    }
}
