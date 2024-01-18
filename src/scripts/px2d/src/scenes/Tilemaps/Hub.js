(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("Hub",
{ "compressionlevel":-1,
 "height":15,
 "infinite":false,
 "layers":[
        {
         "data":[19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19,
            19, 35, 5, 0, 0, 7, 35, 35, 35, 35, 35, 35, 35, 35, 35, 19,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18,
            19, 3, 3, 3, 3, 3, 37, 0, 0, 39, 3, 3, 3, 3, 3, 19,
            19, 19, 19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19,
            19, 19, 19, 19, 19, 19, 20, 0, 0, 18, 19, 19, 19, 19, 19, 19],
         "height":15,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":16,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.10.2",
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/assets\/images\/Tileset\/Px2D Tileset.tsx"
        }],
 "tilewidth":16,
 "type":"map",
 "version":"1.10",
 "width":16
});