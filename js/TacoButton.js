/**
 * Created by evans mobile on 2/8/14.
 */
function TacoButton(spriteImage, spriteImage2, text) {

    this.sprite = spriteImage;
    this.text = text;
    this.positionX = 0;
    this.positionY = 0;
    this.width = spriteImage.width;
    this.height = spriteImage.height;
    this.offset = this.text.length * 5;

    this.setPosition = function (pos, posY) {
        this.positionX = pos;
        this.positionY = posY;
    };

    this.inBounds = function (x, y) {
        if (x >= this.positionX && x <= this.positionX + this.width && y >= this.positionY && y <= this.positionY - this.width) {
            return true;
        } else {
            return false;
        }
    }

    this.handleClicked = function () {
        this.sprite = spriteImage2;
    };

    this.drawButton = function ( g ) {
        g.fillStyle = "rgb(0, 0, 0)";
        g.font = "40px Calibri";
        g.textAlign = "left";
        g.textBaseline = "top";

        g.drawImage( this.sprite, this.positionX, this.positionY );
        g.fillText(this.text, (this.positionX + this.offset), this.positionY + 20);
    };
}