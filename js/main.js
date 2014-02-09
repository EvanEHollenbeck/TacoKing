/**
 * Main Javascript file for initializing the Taco King Saga app
 * Load all resources here then launch the main program
 *
 * @type {canvas}
 */
// Static data for loading assets and controlling game flow
var IMAGES = ['banner2', 'button00', 'button01', 'attack' ];
var STATEENUM = Object.freeze = ({ loadingscreen: {}, mainmenu: {}, battlescreen: {}});


// Create a canvas to work on; this is the main game window
// Get a context to draw with and
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageResources = [];
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
    canvas.addEventListener('click', handleClicks, false);
    last = getTime();
    loadImages(IMAGES, onImagesLoaded);
    ctx.canvas.width = 854;
    ctx.canvas.height = 480;
    SCREENCENTERX = ctx.canvas.width / 2;
    SCREENCENTERY = ctx.canvas.height / 2;
    document.body.appendChild(canvas);
}

// Whether a click has happened since last frame, update mouse position
//TODO mouse position should be updated when mouse is moved, not when clicked.
function handleClicks(evt) {
    clicked = true;
    var mousePos = getMousePos(canvas, evt);
    mouseX = mousePos.x;
    mouseY = mousePos.y;
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
    switch (gameState) {
        case STATEENUM.loadingscreen:
            ctx.drawImage(imageResources[0], SCREENCENTERX - imageResources[0].width / 2, 0);
            tacoButton.drawButton(ctx);
            break;
        case STATEENUM.mainmenu:
            break;
        case STATEENUM.battlescreen:
            break;
    }
}

function getMousePos(incanvas, evt) {
    var rect = incanvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Update game logic
function update() {
    if (clicked === true) {
        switch (gameState) {
            case STATEENUM.loadingscreen:
                if (tacoButton.inBounds(mouseX, mouseY)) {
                    tacoButton.handleClicked();
                    gameState = STATEENUM.mainmenu;
                }
                break;
            case STATEENUM.mainmenu:
                break;
            case STATEENUM.battlescreen:
                break;
        }
    }
    clicked = false;
}

// Get current system time
function getTime() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// process a single frame of the game
function processFrame() {
    now = getTime();
    dt = (now - last) / 1000;    // duration in seconds
    update();
    draw();
    last = now;
    requestAnimationFrame(processFrame, canvas);
}

// initialize listeners, reset the canvas, and begin the game loop
initialize();
reset();
requestAnimationFrame(processFrame, canvas);
