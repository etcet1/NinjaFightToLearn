function Homework(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.isAlive = true;
    this.type = "homework";

    this.draw = function (context) {
        this.context.drawImage(imageRepository.Homework, this.x, this.y);
    }

    this.collideWith = function (otherObject) {

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
