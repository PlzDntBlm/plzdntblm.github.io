import {GameObject} from "./GameObject.js";
export class Player extends GameObject{
    constructor() {
        super();
        this.renderer.imageSrc = './../assets/images/Player.png';
    }
}