function Star(x, y, width, height, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isAlive = true;
    this.type = "star";

    this.draw = function (context) {
        context.drawImage(imageRepository.star, this.x, this.y, this.width, this.height);
    }

    this.collideWith = function (otherObject) {
        var hasCollision = false;

        if (otherObject.type === "homework") {
            if (isColliding(this, otherObject)) {
                this.isAlive = false;
                hasCollision = true;
            }
        }

        return hasCollision;
    }

    this.move = function (leftBorderX, topBorderY, rightBorderX, bottomBorderY) {
        this.x += this.speedX,
        this.y += this.speedY

        if (this.x > rightBorderX ||
                this.x + this.width < leftBorderX ||
                this.y > bottomBorderY ||
                this.y + this.height < topBorderY) {
            this.isAlive = false;
        }
    };
}
