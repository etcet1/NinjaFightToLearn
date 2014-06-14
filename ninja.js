function Ninja(x, y, width, height, images) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.speedX = 0;
    this.speedY = 0;
    this.isAlive = true;
    this.type = "ninja";
    
    this.currentFrame = 0;
    this.framesPerSprite = 20;
    this.currentSprite = 0;
    this.numberOfSprites = images.length;

    this.draw = function (context) {
        // Pan background
        this.y += this.speed;
        this.context.drawImage(imageRepository.ninja, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.ninja, this.x, this.y - this.canvasHeight);
    }
    
    this.collideWith = function (otherObject) {
        
    }

    this.move = function (leftBorderX, topBorderY, rightBorderX, bottomBorderY) {
        // Move the ninja within the given bounds
        var newPosition = {
            x: this.x + this.speedX,
            y: this.y + this.speedY
        };
        
        if (newPosition.x < leftBorderX){
            newPosition.x = leftBorderX;
        }
        if ( newPosition.y < topBorderY){
            newPosition.y = topBorderY;
        }
        if ( newPosition.x + this.width > rightBorderX){
            newPosition.x = rightBorderX - this.width;
        }
        if ( newPosition.y + this.height > bottomBorderY){
            newPosition.y = bottomBorderY - this.height;
        }
        
        // Check if the ninja is moving
        if (this.speedX === 0 && this.speedY === 0){
            return;
        }
        // If not, update the ninja sprite
        this.currentFrame++;
        if (this.currentFrame === this.framesPerSprite){
            ++this.currentSprite;
            this.currentFrame = 0;
        }
        
        if ( this.currentSprite === this.numberOfSprites){
            this.currentSprite = 0;
        }
    };
}
