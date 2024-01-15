export class GameLoop{
    constructor(px2d) {
        this.px2d = px2d;
        this.canvasContext = px2d.canvas.getContext("2d");
        this.lastRenderTime = 0;
        requestAnimationFrame((timestamp) => this.GameLoop(timestamp));
    }
     GameLoop(timestamp) {
        let deltaTime = timestamp - this.lastRenderTime;
        this.lastRenderTime = timestamp;

        this.Update(deltaTime);
        this.Render();

         requestAnimationFrame((timestamp) => this.GameLoop(timestamp));
    }

    Update(deltaTime) {
        // Update game entities and logic
    }
     Render() {
        // Clear canvas
        this.canvasContext.clearRect(0, 0, this.canvasContext.width, this.canvasContext.height);

        // Draw game entities
    }
}