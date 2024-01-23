import {Tile} from "../entities/Tile.js";
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
            // tileMap + tile
            if (arguments.length === 2) {
                // row * 16 + col
                tileMap[tileType.tile.position.row * 16 + tileType.tile.position.col] = tileType;
            }
            // tileMap, tileType, col, row
            if (arguments.length === 4) {
                let tile = new Tile();

                tile.px2d = Px2D.Instance.Px2DContext;
                tile.tile.type = tileType;
                tile.tile.position.col = col;
                tile.tile.position.row = row;


                tileMap[row * 16 + col] = tile;
            }
        } catch (e) {
            console.log(e);
        }
    }

    loadScene() {
        let colCounter = 0;
        let rowCounter = 0;
        Hub.layers[0].data.forEach((tile) => { // Using arrow function
            tile = --tile;
            Scene.SetTileInTileMap(this.tileMap, tile, colCounter, rowCounter);
            colCounter++;
            if (colCounter % 16 === 0) {
                rowCounter++;
                colCounter = 0;
            }
        });
        //console.log(Hub.layers[0].data);
    }
}