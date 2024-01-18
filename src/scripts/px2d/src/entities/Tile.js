import {GameObject} from "./GameObject.js";

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
        this.renderer.imageSrc = Tile.getTileSourceByNumber(this.tile.type);

        this.renderer.drawMode = 'texture';
        this.transform.sizeInPixel.x = 16;
        this.transform.sizeInPixel.y = 16;
    }

    static getTileSourceByNumber(typeNumber) {
        // MissingTexture
        if (typeNumber === 0) {
            return '/images/Tile_Missing.png';
        } else {
            console.log(`Can't convert ${typeNumber} into valid Tile Type!`);
            return '/images/Tile_Missing.png';
        }
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

    setTileType(typeNumber) {
        if (typeof typeNumber === 'number') {
            this.tile.type = typeNumber;
            this.renderer.imageSrc = Tile.getTileSourceByNumber(typeNumber);
        } else {
            console.log(`Can't convert ${typeNumber} into a valid number!`);
        }
    }

    Render(px2d) {
        const context = this.px2d.context;
        const img = new Image();
        img.src = this.px2d.assetsPath + this.renderer.imageSrc;

        const tileCoordinates = Tile.tileCoordinatesToPixelPosition(this.px2d, {
            col: this.tile.position.col,
            row: this.tile.position.row
        });
        context.drawImage(img, tileCoordinates.x, tileCoordinates.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
    }
}