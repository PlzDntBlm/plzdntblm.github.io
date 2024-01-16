import {GameObject} from "./GameObject.js";
export class GameObjectManager {
    constructor() {
        this.gameObjects = [];
    }
    getGameObjects(){
        return this.gameObjects;
    }
    setGameObjects(gameObjects){
        this.gameObjects = gameObjects;
    }
    addGameObject(gameObject){
        this.gameObjects.push(gameObject);
    }
    UpdateGameObjects(deltaTime){
        this.gameObjects.forEach((gameObject) => {
           gameObject.Update(deltaTime);
        });
    }
    FixedUpdateGameObjects(fixedDeltaTime){
        this.gameObjects.forEach((gameObject) => {
            gameObject.FixedUpdate(fixedDeltaTime);
        });
    }
    RenderGameObjects(){
        this.gameObjects.forEach((gameObject) => {
            gameObject.Render();
        });
    }
}