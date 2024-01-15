class GameObject {
    constructor(data) {
        this.transform = {
            position: {
                x: data.position.x ? data.position.x : 0,
                y:data.position.y ? data.position.y : 0
            },
            scale:{
                x:data.scale.x ? data.scale.x : 1,
                y:data.scale.y ? data.scale.y : 1
            },
            sizeInPixel:{
                x:data.sizeInPixel.x ? data.sizeInPixel.x : 16,
                y:data.sizeInPixel.y ? data.sizeInPixel.y : 16
            }
        }
    }
}