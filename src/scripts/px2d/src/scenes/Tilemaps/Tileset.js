export class Tileset {
    constructor(px2d) {
        let tsxFileContent = "";
        fetch(px2d.assetsPath + "images/Tileset/Px2D Tileset.tsx")
            .then(response => response.text())
            .then(text => {
                tsxFileContent = text;
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(tsxFileContent, "text/xml");
                let tileSetJson = this.xmlToJson(xmlDoc);

                Tileset.SpriteSheet = new Image();
                Tileset.SpriteSheet.src = px2d.assetsPath + "images/Pyxel SpriteSheet.png";
                tileSetJson.tileset.tile.forEach((el) => {
                    Tileset.TileSet.push({
                        tileNumber: Number(el['@attributes'].id), type: el['@attributes'].type, source: {
                            locationOnSpriteSheet: {
                                col: el['@attributes'].id % 16,
                                row: Math.floor(el['@attributes'].id / 16)
                            }
                        }
                    });
                });
                //row = field_number // num_columns
                //col = field_number % num_columns

                // Rest of code...
            })
            .catch(error => {
                console.error('Error fetching the .tsx file:', error);
            });
    }

    static TileSet = [];
    static SpriteSheet = {};

    xmlToJson(xml) {
        let obj = {};

        if (xml.nodeType == 1) { // element
            // attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    let attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType == 3) { // text
            obj = xml.nodeValue;
        }

        // children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                let item = xml.childNodes.item(i);
                let nodeName = item.nodeName;
                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        let old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    }
}
