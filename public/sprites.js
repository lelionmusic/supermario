import SpriteSheet from './SpriteSheet.js';
import { loadImage } from './loading.js';

function defineBgTiles(tiles) {
    tiles.define('ground', 0, 0);
    tiles.define('sky', 3, 23);
}

function defineCharSprites(sprites) {
    sprites.defineExact('mario-s-n', 276, 43, 16, 12);
}

export function loadBackgroundSprites() {
    return loadImage('./spritesheets/map.png')
        .then(bgTilesImage => {
            const bgTiles = new SpriteSheet(640, 640, bgTilesImage);
            defineBgTiles(bgTiles);
            return bgTiles;
        });
}

export function loadCharSprites() {
    return loadImage('./spritesheets/characters.gif')
        .then(charSpritesImage => {
            const charSprites = new SpriteSheet(513, 401, charSpritesImage);
            defineCharSprites(charSprites);
            return charSprites;
        });
}
