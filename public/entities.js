import Entity from './Entity.js';
import { gravity } from './main.js';

export function createMario(charSprites, context) {
    const MAX_X_SPEED = 120;
    const mario = new Entity(40, 0);
    let airborne = false;
    const jumpDuration = 0.3;
    let jumpEngageTime = 0

    mario.draw = function() {
        charSprites.drawSprite('mario-s-n', context, this.pos.x, this.pos.y);
    }

    mario.update = function(fps, keyState) {
        this.move(keyState, 1/fps);
        this.pos.x += this.vel.x / fps;
        this.pos.y += this.vel.y / fps;
        if (this.pos.y > 208) {
            this.airborne = false;
            this.vel.y = 0;
            this.pos.y = 208
        }
        else {
            this.vel.y += gravity / fps;
        }
        this.draw(charSprites, 'mario-s-n', context);
    }

    mario.move = function(keyState, deltaTime) {
        this.horizontalMovement(keyState);
        if (jumpEngageTime) {
            this.vel.y = -200;
            jumpEngageTime -= deltaTime;
        }
        if (keyState.has(' ') && !this.airborne) this.startJump(keyState, deltaTime);
        else jumpEngageTime = 0;
    }

    mario.horizontalMovement = function(keyState) {
        if (keyState.has('a')) this.vel.x -= 5;
        if (keyState.has('d')) this.vel.x += 5;
        if (!keyState.has('a') && !keyState.has('d')) {
            if (this.vel.x > 6) this.vel.x -= 6;
            else if (this.vel.x < -6) this.vel.x += 6;
            if (this.vel.x > 0 && this.vel.x <= 6) this.vel.x = 0;
            if (this.vel.x >= -6 && this.vel.x < 0) this.vel.x = 0;
        }
        if (this.pos.x > 306) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = 306;
        if (this.vel.x > MAX_X_SPEED) this.vel.x = MAX_X_SPEED;
        else if (this.vel.x < -MAX_X_SPEED) this.vel.x = -MAX_X_SPEED;
    }

    mario.startJump = function(keyState, deltaTime) {
        jumpEngageTime = jumpDuration;
        this.airborne = true;
        // console.log("jumpelapsed: ", jumpElapsed, "deltatime", deltaTime);
    }

    return mario;
}
