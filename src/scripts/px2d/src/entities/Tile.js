import {GameObject} from "./GameObject.js";
import {Tileset} from "../scenes/Tilemaps/Tileset.js";
import {Px2D} from "../../Px2D.js";

export class Tile extends GameObject {
    constructor(data = {}) {
        super();
        // Initialize data.tile if it's not provided
        data.tile = data.tile || {};
        data.tile.type = data.tile.type || 0;

        // Initialize data.tile.position if it's not provided
        data.tile.position = data.tile.position || {};
        data.tile.position.row = data.tile.position.row || 0;
        data.tile.position.col = data.tile.position.col || 0;

        this.tile = data.tile;
        //this.setTileType(data.tile.type);

        this.renderer.drawMode = 'texture';
        this.transform.sizeInPixel.x = 16;
        this.transform.sizeInPixel.y = 16;
    }

    static tileCoordinatesToPixelPosition(data = {}) {
        data = {
            col: data.col || 0,
            row: data.row || 0
        }

        let x = 0;
        let y = 0;
        if (typeof data.col === 'number' && typeof data.row === 'number') {
            x = 16 * data.col;
            y = 16 * data.row;
            return {x: x, y: y};
        } else {
            console.log(`Can't convert col:${data.col} and row:${data.row} into PixelCoordinates!`);
            return {x: x, y: y};
        }
    }

    DEADsetTileType(wantedType) {
        console.log(this.px2d)
        //console.log(`requested tile of type: ${wantedType}`)
        if (typeof wantedType === 'number') {
            Tile.Tiles.find((element) => {
                if (element.id === wantedType) {
                    this.tile.type = element.id;
                    this.renderer.imageSrc = element.source;
                }
            });
        } else if (typeof wantedType === 'string') {
            Tile.Tiles.find((element) => {
                if (element.name.toLowerCase() === wantedType.toLowerCase()) {
                    this.tile.type = element.id;
                    this.renderer.imageSrc = element.source;
                }
            })
        } else {
            console.log(`Can't convert ${wantedType} into a valid tile type!`);
        }
    }

    Render() {
        //console.log("----------------------------");
        //console.log(this);
        // Draw on column
        let tmpPosition = {col: this.tile.position.col, row: this.tile.position.row};//check
        //console.log(tmpPosition);//check
        let tmpCoordinates = Tile.tileCoordinatesToPixelPosition(tmpPosition);//check
        //tmpCoordinates.y;//check
        //console.log(tmpCoordinates);//check
        let tmpSize = this.transform.sizeInPixel;//check
        //console.log(this.transform.sizeInPixel);//check
        let tmpType = this.tile.type;
        let tmpSource = {
            row: Math.floor(tmpType / 16) || 0,
            col: tmpType % 16 || 0
        };

        if (tmpType >= 0) {
            // Corrected drawImage call
            if (Tileset.SpriteSheet instanceof HTMLImageElement && Tileset.SpriteSheet.complete) {
                // Safe to draw the image
                try {
                    Px2D.Px2DContext.drawImage(
                        Tileset.SpriteSheet,
                        tmpSource.col * 16, // Source X: Column index multiplied by the width of one tile
                        tmpSource.row * 16, // Source Y: Row index multiplied by the height of one tile
                        16, // Source Width: The width of one tile
                        16, // Source Height: The height of one tile
                        tmpCoordinates.x, // Destination X
                        tmpCoordinates.y, // Destination Y
                        tmpSize.x, // Destination Width
                        tmpSize.y // Destination Height
                    );
                } catch (e) {
                    console.log(e);
                }
            } else {
                //console.error('SpriteSheet not ready for drawing');
            }
        }
        //console.log(tmpType);

        //Px2D.Px2DContext.drawImage(Tileset.SpriteSheet, tileCoordinates.x, tileCoordinates.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y, sourceTile.source.locationOnSpriteSheet.col * 16, sourceTile.source.locationOnSpriteSheet.row * 16 + 16, 16, 16);
        //console.log("----------------------------");
    }

    DEADRender() {
        //console.log("----------------------------");
        // find coordinates of source image to draw
        let sourceTile = {};
        sourceTile = Tileset.TileSet.find((el) => {
            if (el.tileNumber === this.tile.type && el.tileNumber !== -1) {
                //console.log(`Positive tileNumber (${typeof el.tileNumber}) ${el.tileNumber} with Tile type (${typeof this.tile.type}) ${this.tile.type}`);
                return el;
            } else {
                //console.log(`Negative tileNumber (${typeof el.tileNumber}) ${el.tileNumber} with Tile type (${typeof this.tile.type}) ${this.tile.type}`);
                Tileset.TileSet.find((el) => {
                    if (el.tileNumber === 0) {
                        return el;
                    }
                });
            }
        });

        if (!sourceTile) {
            //console.log("Couldn't assign sourceTile");
            //console.log(this);
            //console.log(Tileset.TileSet)
            //console.log("----------------------------");
        }
        const tileCoordinates = Tile.tileCoordinatesToPixelPosition({
            col: this.tile.position.col,
            row: this.tile.position.row
        })

        Px2D.Px2DContext.drawImage(Tileset.SpriteSheet, tileCoordinates.x, tileCoordinates.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y, sourceTile.source.locationOnSpriteSheet.col * 16, sourceTile.source.locationOnSpriteSheet.row * 16 + 16, 16, 16);
    }
}