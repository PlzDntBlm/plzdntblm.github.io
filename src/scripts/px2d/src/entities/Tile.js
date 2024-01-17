import {GameObject} from "./GameObject.js";
export class Tile extends GameObject{
    constructor(data = {}) {
        super();
        data.tile = {};
        data.tile.type = data.tile.type || 0;

        this.tile = data.tile;
        this.renderer.imageSrc = this.getTileSourceByNumber(this.tile.type);

        this.renderer.drawMode = 'texture';
        this.transform.sizeInPixel.x = 16;
        this.transform.sizeInPixel.y = 16;
    }

    getTileSourceByNumber(typeNumber){
        // MissingTexture
        if(typeNumber === 0){
            return '/images/Tile_Missing.png';
        }else {
            console.log(`Can't convert ${typeNumber} into valid Tile Type!`);
            return '/images/Tile_Missing.png';
        }
    }
    setTileType(typeNumber){
        if(typeof typeNumber === 'number') {
            this.tile.type = typeNumber;
            this.renderer.imageSrc = this.getTileSourceByNumber(typeNumber);
        }else{
            console.log(`Can't convert ${typeNumber} into a valid number!`);
        }
    }
}