import {Collider} from "./Collider.js";
import {Px2D} from "../../../Px2D.js";

export class AABB extends Collider {
    // Checks if this AABB collides with another AABB
    intersects(other) {
        return (this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y);
    }

    // Update the position of the AABB
    updatePosition(newX, newY) {
        this.x = newX;
        this.y = newY;
    }

    // Optionally, if your entities have velocity, you can include an update method
    update(velocity, deltaTime) {
        this.x += velocity.x * deltaTime;
        this.y += velocity.y * deltaTime;
    }

    // A method to draw the AABB for debugging purposes
    draw() {
        Px2D.Instance.context.beginPath();
        Px2D.Instance.context.rect(this.x, this.y, this.width, this.height);
        Px2D.Instance.context.strokeStyle = 'red';
        Px2D.Instance.context.stroke();
    }
}