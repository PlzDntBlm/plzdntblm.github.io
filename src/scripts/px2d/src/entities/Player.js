import {GameObject} from "./GameObject.js";
import {Px2D} from "../../Px2D.js";
import {CharacterController} from "./CharacterController.js";
import {Rigidbody} from "./Rigidbody.js";
import {AABB} from "../utils/collider/AABB.js";

export class Player extends GameObject {
    constructor() {
        super();
        Player.Instance = this;
        this.renderer.imageSrc = '/images/Player.png';
        this.renderer.drawMode = 'texture';
        this.transform.sizeInPixel.x = 16;
        this.transform.sizeInPixel.y = 16;
        this.renderer.redraw = true;
        this.renderer.image = new Image();
        console.log("Loaded Player Image");
        this.renderer.image.src = Px2D.Instance.assetsPath + this.renderer.imageSrc;
        this.characterController = new CharacterController(this);
        console.log("Constructed Player");
    }

    Init() {
        this.rigidbody = new Rigidbody(1, 0.001);
        this.rigidbody.transform.position = {...this.transform.position};
        console.log("Assigned Player position to Rigidbody");
    }

    Update(deltaTime) {
        // Update the Rigidbody's physics
        this.rigidbody.Update(deltaTime);

        // Other player updates such as handling input
        // ...

        this.rigidbody.Update(deltaTime);
        this.transform.position.x = this.rigidbody.transform.position.x;
        this.transform.position.y = this.rigidbody.transform.position.y;

        // Update the collider position
        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;

        // Handle collisions
        // ...
    }

    moveLeft(deltaTime) {
        // Logic for moving left
    }

    moveRight(deltaTime) {
        // Logic for moving right
    }

    crouch(deltaTime) {
        // Logic for crouching or going down
    }

    jump(deltaTime) {
        // Logic for jumping
    }

    interact() {
        // Logic for interacting with the game world
    }

    canJump() {
        // Logic to determine if the player can jump
        return true; // Placeholder, actual logic needed
    }

    Render() {
        Px2D.Instance.context.drawImage(this.renderer.image, this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
    }
}