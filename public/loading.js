function loadLevel(level) {
    return fetch(`./levels/${level}.json`)
        .then(response => response.json());
}

function loadImage(src) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = src;
    });
}

export { loadLevel, loadImage };
