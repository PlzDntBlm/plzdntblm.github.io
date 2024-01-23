import {GameObject} from "./GameObject.js";

export class GameObjectManager {
    constructor() {
        this.gameObjects = [];
        console.log("Constructed GameObjectManager");
    }

    getGameObjects() {
        return this.gameObjects;
    }

    setGameObjects(gameObjects) {
        this.gameObjects = gameObjects;
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    addGameObjects(data = []) {
        data.forEach((gameObject) => {
            this.gameObjects.push(gameObject);
        });
    }

    UpdateGameObjects(deltaTime) {
        this.gameObjects.forEach((gameObject) => {
            gameObject.Update(deltaTime);
        });
        this.handleCollisions();
    }

    FixedUpdateGameObjects(fixedDeltaTime) {
        this.gameObjects.forEach((gameObject) => {
            gameObject.FixedUpdate(fixedDeltaTime);
        });
    }

    handleCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                let objA = this.gameObjects[i];
                let objB = this.gameObjects[j];
                // Assuming each gameObject has a collider property that is an AABB
                if (objA.collider && objB.collider && objA.collider.intersects(objB.collider)) {
                    objA.OnCollision(objB);
                    objB.OnCollision(objA);
                }
            }
        }
    }

    RenderGameObjects(px2d) {
        this.gameObjects.forEach((gameObject) => {
            gameObject.Render(px2d);
        });
    }
}