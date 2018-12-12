export default class Timer {
    constructor(fps) {
        this.fps = fps;
        this.accumTime = 0;
        this.lastTime = 0;
        this.tick = this.tick.bind(this);
    }

    update() {}

    tick(time) {
        this.accumTime += (time - this.lastTime) / 1000;
        while (this.accumTime > (1/this.fps)) {
            this.update();
            this.accumTime -= 1/this.fps;
        }
        this.lastTime = time;
        requestAnimationFrame(this.tick);
    };

    start() {
        requestAnimationFrame(this.tick);
    }
}
