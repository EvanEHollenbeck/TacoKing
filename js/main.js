/**
 * Main Javascript file for initializing the Taco King Saga app
 * Load all resources here then launch the main program
 *
 * @type {HTMLElement}
 */

// Create a canvas to work on; this is the main game window
// Get a context to draw with and
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var STATEENUM = Object.freeze = ({ loadingscreen: {}, mainmenu: {}, battlescreen: {}});
var gameState = STATEENUM.loadingscreen, tacoButton, imageResources, now, dt,
    last;

function onImagesLoaded() {

}

// Initialization
function initialize() {
    last = getTime();
    imageResources = loadImages(imageNames, onImagesLoaded)
    canvas.width = 854;
    canvas.height = 480;
    document.body.appendChild(canvas);
    tacoButton = new TacoButton(imageResources[0], "HELLO");
}

// Initialize the canvas to default
function reset() {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
}

// Draw function, draw based on current state
function draw() {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
    if (gameState === STATEENUM.loadingscreen) {
        ctx.drawImage(bgImage, 0, 0);
        tacoButton.drawButton(ctx);
    }
}

// Update game logic
function update() {

}

function addListeners() {

}

// Get current system time
function getTime() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};


function processFrame() {
    now = getTime();
    dt = (now - last) / 1000;    // duration in seconds
    update();
    draw();
    last = now;
    requestAnimationFrame(processFrame, canvas);
}

initialize();
addListeners();
reset();
requestAnimationFrame(processFrame, canvas);
