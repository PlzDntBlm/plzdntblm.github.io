export class CharacterController {
    constructor(player) {
        this.player = player;
        this.inputState = {
            left: false,
            right: false,
            jump: false,
            down: false,
            interact: false,
            menu: false
            // Add other actions as needed.
        };

        this.initInputListeners();
    }

    initInputListeners() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        switch (event.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.inputState.left = true;
                //console.log("left")
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.inputState.right = true;
                //console.log("right")
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.inputState.down = true;
                //console.log("down")
                break;
            case 'Space':
                this.inputState.jump = true;
                //console.log("up")
                break;
            case 'KeyF':
            case 'Enter':
                this.inputState.interact = true;
                //console.log("interact")
                break;
            // Add other cases as needed.
        }

        // Prevent default action to avoid scrolling the webpage with arrow keys
        event.preventDefault();
    }

    handleKeyUp(event) {
        switch (event.code) {
            case 'ArrowLeft':
            case 'KeyA':
                this.inputState.left = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.inputState.right = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.inputState.down = false;
                break;
            case 'Space':
                this.inputState.jump = false;
                break;
            case 'KeyF':
            case 'Enter':
                this.inputState.interact = false;
                break;
            // Add other cases as needed.
        }

        // Prevent default action to avoid scrolling the webpage with arrow keys
        event.preventDefault();
    }

    update(deltaTime) {
        // Movement controls
        if (this.inputState.left) {
            this.player.moveLeft(deltaTime);
        }
        if (this.inputState.right) {
            this.player.moveRight(deltaTime);
        }
        if (this.inputState.down) {
            this.player.crouch(deltaTime);
        }

        // Jumping control
        if (this.inputState.jump && this.player.canJump()) {
            this.player.jump(deltaTime);
        }

        // Interaction control
        if (this.inputState.interact) {
            this.player.interact();
        }

        // Add any additional control updates needed.

        // Reset one-time action inputs if necessary
        this.inputState.interact = false;
    }
}
