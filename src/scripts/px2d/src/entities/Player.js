import {GameObject} from "./GameObject.js";

export class Player extends GameObject {
    constructor() {
        super();
        this.renderer.imageSrc = '/images/Player.png';
        this.renderer.drawMode = 'texture';
        this.transform.sizeInPixel.x = 16;
        this.transform.sizeInPixel.y = 16;
    }

    Render() {
        super.Render();
    }
}