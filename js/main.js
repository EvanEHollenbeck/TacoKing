/**
 * Main Javascript file for initializing the Taco King Saga app
 * Load all resources here then launch the main program
 *
 * @type {}
 */

// Create a canvas to work on; this is the main game window
// Get a context to draw with and
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Display lists and data
var imageResources = [], displayList = [], spriteList = [];

// State data
var gameState = STATEENUM.loadingscreen,
    tacoButton, now, dt, last, SCREENCENTERX, SCREENCENTERY,
    mouseX = 0, mouseY = 0, clicked = false;

//TODO: Create a loader that reacts to this event
function onImagesLoaded(callValue) {
    imageResources = callValue;
    tacoButton = new TacoButton(imageResources[1], imageResources[2], "  START");
    tacoButton.setPosition(SCREENCENTERX - tacoButton.width / 2, SCREENCENTERY + 120);
    loadMainMenu();
    loadSprites();
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

// Draw function, draw based on current state
function draw() {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
    switch (gameState) {
        case STATEENUM.loadingscreen:
            ctx.drawImage(imageResources[0], SCREENCENTERX - imageResources[0].width / 2, 0);
            tacoButton.draw(ctx);
            break;
        case STATEENUM.mainmenu:
            renderDisplayList(displayList, ctx);
            renderDisplayList(spriteList, ctx);
            break;
        case STATEENUM.battlescreen:
            break;
    }
}

function loadMainMenu() {
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "  FIGHT"));
    displayList[0].setPosition(SCREENCENTERX - imageResources[1].width, 100);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "  LOGIN"));
    displayList[1].setPosition(SCREENCENTERX - imageResources[1].width, 180);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "OPTIONS"));
    displayList[2].setPosition(SCREENCENTERX - imageResources[1].width, 260);
    displayList.push(new TacoButton(imageResources[1], imageResources[2], "   BACK"));
    displayList[3].setPosition(SCREENCENTERX - imageResources[1].width, 340);
}

function loadSprites() {
    spriteList.push(new AnimatedSprite(imageResources[6], 210, 210, 2));
    spriteList.push(new AnimatedSprite(imageResources[6], 210, 210, 2));
    spriteList.push(new AnimatedSprite(imageResources[4], 210, 210, 2));
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
                for (var i = 0; i < spriteList.length; i++) {
                    spriteList[i].nextFrame();
                }
                break;
            case STATEENUM.battlescreen:
                break;
        }
    }
    clicked = false;
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
reset(ctx);
requestAnimationFrame(processFrame, canvas);
