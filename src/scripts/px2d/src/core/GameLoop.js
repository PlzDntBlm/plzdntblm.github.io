export class GameLoop {
    constructor(px2d) {
        this.frameCounter = 0;
        this.px2d = px2d;
        this.lastRenderTime = 0;
        this.accumulatedTime = 0;
        this.fixedTimeStep = 1000 / 60; // 60 updates per second
        requestAnimationFrame((timestamp) => this.GameLoop(timestamp));
    }

    GameLoop(timestamp) {
        let deltaTime = timestamp - this.lastRenderTime;
        this.lastRenderTime = timestamp;
        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.fixedTimeStep) {
            this.FixedUpdate(this.fixedTimeStep);
            this.accumulatedTime -= this.fixedTimeStep;
        }

        this.Update(deltaTime);
        this.Render();

        requestAnimationFrame((timestamp) => this.GameLoop(timestamp));
    }

    Update(deltaTime) {
        // Update game entities and logic based on variable deltaTime
        this.px2d.game.gameObjectManager.UpdateGameObjects(deltaTime);
    }

    FixedUpdate(fixedDeltaTime) {
        // Consistent update logic, independent of frame rate
        this.px2d.game.gameObjectManager.FixedUpdateGameObjects(fixedDeltaTime);
    }

    Render() {
        // Clear canvas and draw game entities
        console.log(this.frameCounter)
        this.frameCounter++;
        if(this.px2d.context){
            this.px2d.context.clearRect(0, 0, this.px2d.overlay.firstChild.width, this.px2d.overlay.firstChild.height);

            this.px2d.game.gameObjectManager.RenderGameObjects();
        }
        // Drawing logic...
    }
}
