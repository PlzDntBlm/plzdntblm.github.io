import {Px2D} from "../../Px2D.js";

export class GameObject {
    constructor(data = {}) {
        // Set default values if data or its properties are undefined
        data.px2d = data.px2d || null;
        data.transform = data.transform || {};
        data.transform.position = data.transform.position || {};
        data.transform.scale = data.transform.scale || {};
        data.transform.sizeInPixel = data.transform.sizeInPixel || {};
        data.renderer = data.renderer || {};

        this.px2d = data.px2d;
        this.transform = {
            position: {
                x: data.transform.position.x || 0,
                y: data.transform.position.y || 0
            },
            scale: {
                x: data.transform.scale.x || 1,
                y: data.transform.scale.y || 1
            },
            sizeInPixel: {
                x: data.transform.sizeInPixel.x || 16,
                y: data.transform.sizeInPixel.y || 16
            }
        };
        this.renderer = {
            imageSrc: data.renderer.imageSrc || null,
            drawMode: data.renderer.drawMode || 'rect',
            redraw: data.renderer.redraw || false,
            fillColor: data.renderer.fillColor || 'black',
        };
    }

    // Method to handle collisions with another object
    OnCollision(otherObject) {
        // Default collision response
    }

    Update(deltaTime) {

    }

    FixedUpdate(fixedDeltaTime) {

    }

    Render() {
        if (this.renderer.drawMode === 'rect') {
            Px2D.Instance.context.beginPath();
            Px2D.Instance.context.fillStyle = this.renderer.fillColor;
            Px2D.Instance.context.fillRect(this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
            Px2D.Instance.context.stroke();
        }
        if (this.renderer.drawMode === 'texture') {
            const img = new Image();
            img.src = this.px2d.assetsPath + this.renderer.imageSrc;
            Px2D.Instance.context.drawImage(img, this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
        }
    }

    /*Render(){
        if(this.renderer.drawMode === 'rect'){
            this.context.beginPath();
            this.context.fillStyle = this.renderer.fillColor;
            this.context.fillRect(this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
            this.context.stroke();
        }
        if(this.renderer.drawMode === 'texture'){
            this.context.drawImage(this.renderer.imageSrc, this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
        }
    }*/
}