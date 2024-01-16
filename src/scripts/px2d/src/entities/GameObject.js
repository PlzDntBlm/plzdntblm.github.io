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
            fillColor: data.renderer.fillColor || 'black',
        };
    }
    Update(deltaTime){

    }
    FixedUpdate(fixedDeltaTime){

    }
    Render(){
        if(this.renderer.drawMode === 'rect'){
            const context = this.px2d.context;
            context.beginPath();
            context.fillStyle = this.renderer.fillColor;
            context.fillRect(this.transform.position.x, this.transform.position.y, this.transform.sizeInPixel.x, this.transform.sizeInPixel.y);
            context.stroke();
        }
    }
}