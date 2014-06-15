function Ninja(x, y, width, height, images) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images;
    
    this.speedX = 0;
    this.speedY = 0;
    this.isAlive = true;
    this.type = "ninja";
    
    this.currentFrame = 0;
    this.framesPerSprite = 15;
    this.currentSprite = 0;
    this.numberOfSprites = images.length;

    this.draw = function (context) {
        context.drawImage(images[this.currentSprite], this.x, this.y, this.width, this.height);
    }
    
    this.collideWith = function (otherObject) {
        if (otherObject.type === "homework"){
            if (isColliding(this, otherObject)){
                this.isAlive = false;
            }
        }
    }

    this.update = function () {
        var ninjaSpeed = 2,
            hasPressedHorizontalArrolKey = false,
            hasPressedVerticalArrolKey = false;

        if (controls.pressedKeys[37]) {
            this.speedX = -ninjaSpeed;
            hasPressedHorizontalArrolKey = true;
        }

        if (controls.pressedKeys[38]) {
            this.speedY = -ninjaSpeed;
            hasPressedVerticalArrolKey = true;
        }

        if (controls.pressedKeys[39]) {
            this.speedX = ninjaSpeed;

            if (hasPressedHorizontalArrolKey) {
                hasPressedHorizontalArrolKey = false;
            } else {
                hasPressedHorizontalArrolKey = true;
            }
        }

        if (controls.pressedKeys[40]) {
            this.speedY = ninjaSpeed;

            if (hasPressedVerticalArrolKey)
            {
                hasPressedVerticalArrolKey = false;
            } else {
                hasPressedVerticalArrolKey = true;
            }
        }

        if (!(hasPressedHorizontalArrolKey || hasPressedVerticalArrolKey)) {
            this.speedX = 0;
            this.speedY = 0;
        }
    }

    this.move = function (leftBorderX, topBorderY, rightBorderX, bottomBorderY) {
        // Check if the ninja is moving
        if (this.speedX === 0 && this.speedY === 0){
            return;
        }
        
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
        
        // Update the ninja sprite
        this.currentFrame++;
        if (this.currentFrame === this.framesPerSprite){
            ++this.currentSprite;
            this.currentFrame = 0;
        }
        
        if ( this.currentSprite === this.numberOfSprites){
            this.currentSprite = 0;
        }

        this.x = newPosition.x;
        this.y = newPosition.y;
    };
}
