function animatedSprite(imageWidth) {
    this.imageWidth = imageWidth;
    this.numFrames = 2;
    this.frameIndex = 0;
    this.frameWidth = 210;
    this.frameHeight = 210;
    this.framePosX = 0;
    this.framePosY = 0;
    this.canvasPosX = 0;
    this.canvasPosY = 0;

    this.setFrameSequence = function()
    {
        this.framePosX += this.frameWidth;
        this.frameIndex += 1;
        if (this.frameIndex >= this.numFrames) {
            this.framePosX = 0;
            this.framePosY = 0;
            this.frameIndex = 0;
        } else if ((this.framePosX + this.frameWidth) > this.imageWidth) {
            this.framePosX = 0;
            this.framePosY += this.frameHeight;
        }
    };

    this.draw = function(image, ctx)
    {
        ctx.drawImage(image, this.framePosX, this.framePosY, this.frameWidth, this.frameHeight, this.canvasPosX, this.canvasPosY, this.frameWidth, this.frameHeight);
    }
}