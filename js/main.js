// Create a canvas to work on; this is the main game window
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var STATEENUM = Object.freeze = ({ loadingscreen: {}, mainmenu: {}, battlescreen: {}});
var gameState = STATEENUM.loadingscreen;
canvas.width = 854;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "img/banner2.png";

//Button image
var buReady = false;
var buImage = new Image();
buImage.onload = function () {
    buReady = true;
}
buImage.src = "img/button2.png";

var tacoButton = new TacoButton(buImage, "HELLO");

function reset() {

}

function draw() {
    ctx.fillStyle = '#A8A8A8';
    ctx.fillRect(0, 0, 854, 480);
    if (gameState === STATEENUM.loadingscreen) {
        ctx.drawImage(bgImage, 0, 0);
        tacoButton.drawButton(ctx);
    }
}

function update() {

}

function getTime() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

var now, dt,
    last = getTime();

function frame() {
    now = getTime();
    dt = (now - last) / 1000;    // duration in seconds
    update();
    draw();
    last = now;
    requestAnimationFrame(frame, canvas);
}

reset();
requestAnimationFrame(frame, canvas);
