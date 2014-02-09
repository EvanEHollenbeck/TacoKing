/**
 * Main Javascript file for initializing the Taco King Saga app
 * Load all resources here then launch the main program
 *
 * @type {HTMLElement}
 */

// Create a canvas to work on; this is the main game window
// Get a context to draw with and
var canvas = document.createElement("canvas");
var IMAGES = ['banner2', 'button00', 'button01'];
var imageResources = [];
var ctx = canvas.getContext("2d");
var STATEENUM = Object.freeze = ({ loadingscreen: {}, mainmenu: {}, battlescreen: {}});
var gameState = STATEENUM.loadingscreen,
    tacoButton, now, dt, last, SCREENCENTERX, SCREENCENTERY,
    mouseX = 0, mouseY = 0, clicked = false;

//TODO: Create a loader that reacts to this event
function onImagesLoaded(callValue) {
    imageResources = callValue;
    tacoButton = new TacoButton(imageResources[1], imageResources[2], "Start Game");
    tacoButton.setPosition(SCREENCENTERX - tacoButton.width / 2, SCREENCENTERY + 120);
}

// Initialization
function initialize() {
    addEventListener('click', handleClicks, true);
    last = getTime();
    loadImages(IMAGES, onImagesLoaded);
    ctx.canvas.width = 854;
    ctx.canvas.height = 480;
    SCREENCENTERX = ctx.canvas.width / 2;
    SCREENCENTERY = ctx.canvas.height / 2;
    document.body.appendChild(canvas);
}


function handleClicks() {
    clicked = true;
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
        ctx.drawImage(imageResources[0], SCREENCENTERX - imageResources[0].width / 2, 0);
        tacoButton.drawButton(ctx);
    }
}


// Update game logic
function update() {

    if (clicked === true) {
        if (gameState === STATEENUM.loadingscreen) {
            if (tacoButton.inBounds(mouseX, mouseY)) {
                tacoButton.handleClicked();
            }
        }
        clicked = false;
    }
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
