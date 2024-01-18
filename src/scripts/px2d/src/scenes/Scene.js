import {Tile} from "./../entities/Tile.js";
import {Hub} from "../assets/scenes/Hub.js";
import {Px2D} from "../../Px2D.js";

export class Scene {
    constructor(px2d) {
        this.px2d = px2d;
        this.tileMap = [];
        this.loadScene();
    }

    static SetTileInTileMap(tileMap, tileType, col, row, px2d) {
        try {
            // tilemap + tile
            if (arguments.length === 2) {
                // row * 16 + col
                tileMap[tileType.tile.position.row * 16 + tileType.tile.position.col] = tileType;
            }
            // tilemap, tileType, col, row
            if (arguments.length === 4) {
                let tile = new Tile();

                tile.px2d = Px2D.Px2DContext;
                tile.tile.type = tileType;
                tile.tile.position.col = col;
                tile.tile.position.row = row;


                tileMap[row * 16 + col] = tile;
            }
            console.log("Added tile to Tilemap!");
        } catch (e) {
            console.log(e);
        }
    }

    loadScene() {
        let colCounter = 0;
        let rowCounter = 0;
        let tempTileMap = [];
        Hub.layers[0].data.forEach((tile, index) => { // Using arrow function
            Scene.SetTileInTileMap(this.tileMap, tile - 1, colCounter, rowCounter);
            colCounter++;
            if (colCounter % 16 === 0) {
                rowCounter++;
                colCounter = 0;
            }
        });
    }
}