import { loadLevel, loadImage } from './loading.js';
import { loadCharSprites, loadBackgroundSprites } from './sprites.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';
import KeyboardState from './KeyboardState.js';


// Draw all backgrounds under jsonfile.backgrounds
function drawBackgrounds(level, tiles, context) {
    level.backgrounds.forEach(bg => {
        bg.ranges.forEach(range => {
            for (let x = range[0]; x < range[1]; x++) {
                for (let y = range[2]; y < range[3]; y++) {
                    tiles.drawTile(bg.tile, context, x, y);
                }
            }
        })
    })
}

function createBGLayer(level, spritesheet) {
    const buffer = document.createElement('canvas');
    buffer.width = 320;
    buffer.height = 256;
    drawBackgrounds(level, spritesheet, buffer.getContext('2d'));
    return buffer;
}

function main() {
    const screen = document.getElementById('screen');
    const context = screen.getContext('2d');
    const fps = 60;
    const timer = new Timer(fps);
    const input = new KeyboardState();
    input.listen();

    Promise.all([
        loadBackgroundSprites(),
        loadLevel('1-1'),
        loadCharSprites(),
    ]).then(([bgSprites, levelJSON, charSprites]) => {
        const bgBuffer = createBGLayer(levelJSON, bgSprites);
        const mario = createMario(charSprites, context);
        mario.pos.set(50, 208);
        // mario.vel.set(60, -500);

        /* UPDATE */
        timer.update = function() {
            context.drawImage(bgBuffer, 0, 0);
            mario.update(fps, input.keyState);
        }

        timer.start();
    }).catch(err => console.log(err));
}

export const gravity = 800;
main();
