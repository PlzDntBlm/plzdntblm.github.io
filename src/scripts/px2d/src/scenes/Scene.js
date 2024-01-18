import {Tile} from "./../entities/Tile.js";

export class Scene {
    constructor() {
        this.tileMap = [];
    }

    static SetTileInTileMap(tileMap, tileType, col, row) {
        try {
            // tilemap + tile
            if (arguments.length === 2) {
                // row * 16 + col
                tileMap[tileType.tile.position.row * 16 + tileType.tile.position.col] = tileType;
                console.log(tileMap)
            }
            // tilemap, tileType, col, row
            if (arguments.length === 4) {
                let tile = new Tile();
                tile.setTileType(tileType);
                tile.transform.tile.position.col = col;
                tile.transform.tile.position.row = row;

                // idx = col*total#ofcol+row*total#ofrow
                tileMap[row * 16 + col] = tile;
            }
            console.log("Added tile to Tilemap!");
        } catch (e) {
            console.log(e);
        }
    }
}