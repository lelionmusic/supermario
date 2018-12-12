import {Vec2} from './math.js';

export default class Entity {
    constructor(x, y) {
        this.pos = new Vec2(x, y);
        this.vel = new Vec2(0, 0);
    }
}
