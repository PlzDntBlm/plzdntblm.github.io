import {GameObject} from "./GameObject.js";
import {Px2D} from "../../Px2D.js";
import {CharacterController} from "./CharacterController.js";
import {Rigidbody} from "./Rigidbody.js";
import {AABB} from "../utils/collider/AABB.js";
import {Tile} from "./Tile.js";

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
        this.moveForce = 0.001;
        this.jumpForce = 0.001;
        console.log("Constructed Player");
    }

    Init() {
        this.rigidbody = new Rigidbody(1, 0.0000008);
        this.rigidbody.transform.position = {...this.transform.position};
        console.log("Assigned Player position to Rigidbody");
        this.transform.previousPosition = {
            x: this.rigidbody.transform.position.x,
            y: this.rigidbody.transform.position.y
        }
    }

    Update(deltaTime) {
        this.transform.previousPosition = this.transform.position;
        this.rigidbody.isGrounded = false;
        // Update the Rigidbody's physics
        this.rigidbody.Update(deltaTime);

        // Other player updates such as handling input
        // ...
        this.handleInput();

        this.rigidbody.Update(deltaTime);
        this.transform.position.x = this.rigidbody.transform.position.x;
        this.transform.position.y = this.rigidbody.transform.position.y;

        // Update the collider position
        this.collider.x = this.transform.position.x;
        this.collider.y = this.transform.position.y;

        // Handle collisions
        // ...
    }

    moveLeft() {
        // Logic for moving left
        this.rigidbody.applyForce({x: -this.moveForce, y: 0});
    }

    moveRight() {
        // Logic for moving right
        this.rigidbody.applyForce({x: this.moveForce, y: 0});
    }

    down() {

    }

    crouch(deltaTime) {
        // Logic for crouching or going down
    }

    jump(deltaTime) {
        // Logic for jumping
        if (this.rigidbody.isGrounded) {
            console.log("AAARGH")
            this.rigidbody.applyForce({x: 0, y: -this.jumpForce});
        }
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

    OnCollision(otherObject) {
        if (otherObject instanceof Tile && otherObject.solid) {
            const playerEdges = {
                top: this.transform.previousPosition.y,
                right: this.transform.previousPosition.x + this.transform.sizeInPixel.x,
                bottom: this.transform.previousPosition.y + this.transform.sizeInPixel.y,
                left: this.transform.previousPosition.x
            }
            const otherObjectEdges = {
                top: otherObject.transform.position.y,
                right: otherObject.transform.position.x + otherObject.transform.sizeInPixel.x,
                bottom: otherObject.transform.position.y + otherObject.transform.sizeInPixel.y,
                left: otherObject.transform.position.x,
            }
            const verticalMovement = this.rigidbody.velocity.y > 0;
            const wasAbove = playerEdges.bottom <= otherObjectEdges.top; // && playerEdges.top < otherObjectEdges.top
            console.log(playerEdges.bottom, otherObjectEdges.top)
            const wasBetweenOtherEdges = (otherObjectEdges.left <= playerEdges.left && otherObjectEdges.right <= playerEdges.right);
            const wasOnLeft = otherObjectEdges.left >= playerEdges.left && playerEdges.right <= otherObjectEdges.right;
            //Px2D.Instance.game.gizmo.transform.position = {...otherObject.transform.position};
            // Handle vertical (ground) collisions
            console.log(wasAbove)
            if (verticalMovement && wasAbove) {
                //console.log("Landed on a tile");
                this.rigidbody.transform.position.y = otherObject.transform.position.y - this.transform.sizeInPixel.y;
                this.rigidbody.velocity.y = 0;
                this.rigidbody.isGrounded = true;
            } /*else if (!wasAbove) {
                console.log(wasOnLeft)
                // If not a vertical ground collision, check horizontal
                if (wasOnLeft)
                    console.log(wasOnLeft)
                //console.log(playerEdges.left, otherObjectEdges.left, playerEdges.right, otherObjectEdges.left)
                if (this.rigidbody.velocity.x > 0 && wasOnLeft) {
                    console.log("Moving right, hit the left side of a tile");
                    this.rigidbody.transform.position.x = otherObject.transform.position.x - this.transform.sizeInPixel.x;
                    this.rigidbody.velocity.x = 0;
                } else if (this.rigidbody.velocity.x < 0 && !wasOnLeft) {
                    console.log("Moving left, hit the right side of a tile");
                    this.rigidbody.transform.position.x = otherObject.transform.position.x + otherObject.transform.sizeInPixel.x;
                    this.rigidbody.velocity.x = 0;
                }
            }*/
        }
    }


    handleInput() {
        let tmpInputState = this.characterController.inputState;
        if (tmpInputState.jump) {
            this.jump()
        }
        if (tmpInputState.right) {
            this.moveRight()
        }
        if (tmpInputState.down) {
            this.down()
        }
        if (tmpInputState.left) {
            this.moveLeft()
        }
    }
}