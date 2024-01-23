export class Rigidbody {
    constructor(mass, gravityScale) {
        this.mass = mass;
        this.gravityScale = gravityScale;
        this.velocity = {x: 0, y: 0};
        this.isGrounded = false;
        this.transform = {
            position: {
                x: 0,
                y: 0
            }
        }
        console.log("Constructed Rigidbody")
    }

    applyGravity() {
        // Apply gravity force if not grounded
        if (!this.isGrounded) {
            this.velocity.y += 9.81 * this.gravityScale; // Gravity acceleration constant
        }
    }

    applyForce(force) {
        // Newton's second law: F = m * a
        // a = F / m
        this.velocity.x += force.x / this.mass;
        this.velocity.y += force.y / this.mass;
    }

    Update(deltaTime) {
        // Update position based on velocity
        // Here typically multiply by deltaTime to get frame-rate independent movement
        this.transform.position.x += this.velocity.x * deltaTime;
        this.transform.position.y += this.velocity.y * deltaTime;

        // Apply gravity each frame
        this.applyGravity();

        // Implement collision detection and adjust isGrounded accordingly
        // ...
    }
}
