export default class SpriteSheet {

    /**
     * sprites: image containing tilesheet/spritesheet
     * tiles:   datastructure for storing the defined positions
     */
    constructor(dx, dy, sprites) {
        this.dx = dx;
        this.dy = dy;
        this.sprites = sprites;
        this.tiles = new Map();
    }

    define(name, offsetX, offsetY, height=16, width=16) {
        this.tiles.set(name, {offsetX: offsetX*width,
                              offsetY: offsetY*height,
                              height: height,
                              width: width});
    }

    defineExact(name, offsetX, offsetY, height, width) {
        this.tiles.set(name, {offsetX: offsetX,
                              offsetY: offsetY,
                              height: height,
                              width: width});
    }

    /* Draw in exact position of pixels x, y */
    drawSprite(name, context, x, y) {
        const posX = this.tiles.get(name).offsetX;
        const posY = this.tiles.get(name).offsetY;
        const width = this.tiles.get(name).width;
        const height = this.tiles.get(name).height;
        context.drawImage(this.sprites, posX,   posY,   width, height,
                                        x, y, width, height);
    }

    /* Draw in position x, y multiplied with size of tile. */
    drawTile(name, context, x, y) {
        const width = this.tiles.get(name).width;
        const height = this.tiles.get(name).height;
        this.drawSprite(name, context, x*width, y*height);
    }
}
