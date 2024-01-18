import {GameObject} from "./GameObject.js";
import {Tileset} from "../scenes/Tilemaps/Tileset.js";

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

    static tileCoordinatesToPixelPosition(px2d, data = {}) {
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

    setTileType(wantedType) {
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

    Render(px2d) {
        const context = this.px2d.context;
        const img = new Image();
        img.src = this.px2d.assetsPath + this.renderer.imageSrc;

        // find coordinates of source image to draw
        let sourceTile = Tileset.TileSet.find((el) => {
            if (Number(el.tileNumber) === Number(this.tile.type)) {
                return el;
            }
        });

        const tileCoordinates = Tile.tileCoordinatesToPixelPosition(this.px2d, {
            col: this.tile.position.col,
            row: this.tile.position.row
        })
        context.drawImage(Tileset.SpriteSheet, tileCoordinates.x, tileCoordinates.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y, sourceTile.);
        ;
        //context.drawImage(img, tileCoordinates.x, tileCoordinates.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
    }
}