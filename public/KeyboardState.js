export default class KeyboardState {
    constructor() {
        // Holds the state of keys
        this.keyState = new Set();

        // Holds functions mapped to keys
        this.actions = new Map();
        this.addAction('a', this.moveLeft);
        this.addAction('s', this.duck);
        this.addAction('d', this.moveRight);
        this.addAction('w', this.startJump);
        this.addAction(' ', this.startJump);
    }

    addAction(key, action) {
        this.actions.set(key, action);
    }

    listen() {
        window.addEventListener('keydown', event => {
            if (this.actions.get(event.key) === undefined) return;
            event.preventDefault();
            if (this.keyState.has(event.key)) return;
            this.keyState.add(event.key);
        });
        window.addEventListener('keyup', event => {
            if (!this.keyState.has(event.key)) return;
            event.preventDefault();
            this.keyState.delete(event.key);
        })
    }

    moveLeft(mario) {
        mario.vel.x = -60;
    }
    
    moveRight(mario) {
        mario.vel.x = 60;
    }

    duck() {
    }
    
    startJump() {
    }
}
