/**
 * Created by evans mobile on 2/8/14.
 */
function TacoButton ( spriteImage, text ) {

    this.callbacks = {};
    this.sprite = spriteImage;
    this.text = text;
    this.positionX = 0;
    this.positionY = 0;

    this.setPosition = function (pos, posY) {
        this.positionX = pos;
        this.positionY = posY;
    };

    this.addListener = function (functionName, handler) {
        if (functionName in callbacks)
            callbacks[functionName].push(handler);
        else
            callbacks[functionName] = [handler];
    };

    this.drawButton = function ( g ) {
        g.fillStyle = "rgb(0, 0, 0)";
        g.font = "24px Helvetica";
        g.textAlign = "left";
        g.textBaseline = "top";

        g.drawImage( this.sprite, this.positionX, this.positionY );
        g.fillText(this.text, this.positionX, this.positionY );
    };
}