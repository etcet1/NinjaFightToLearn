function Homework(x, y, width, height, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.isAlive = true;
    this.type = "homework";

    this.draw = function (context) {
        this.context.drawImage(imageRepository.Homework, this.x, this.y, this.width, this.height);
    }

    this.collideWith = function (otherObject) {
        if (otherObject.type === "ninja" || otherObject.type === "star") {
            if (isColliding(this, otherObject)) {
                this.isAlive = false;
            }
        }
    }

    this.move = function (leftBorderX, topBorderY, rightBorderX, bottomBorderY) {
        this.x += this.speedX,
        this.y += this.speedY

        if (this.x === rightBorderX ||
                this.x - this.width === leftBorderX ||
                this.y === bottomBorderY ||
                this.y - this.height === topBorderY) {
            this.isAlive = false;
        }
    };
}
