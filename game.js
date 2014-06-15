var game = new Game();

function init() {
    game.init();
}

function Game() {
    var self = this;

    this.init = function () {
        drawStartScreen(Raphael(0, 0, 800, 600));

        this.canvas = document.getElementById('game-canvas');

        if (this.canvas.getContext) {
            this.currentFrame = 0;
            this.frameAtFire = 0;


            this.context = this.canvas.getContext('2d');
            this.background = new Background(imageRepository.background);

            this.ninja = new Ninja(
                0,
                0,
                imageRepository.ninja[0].width,
                imageRepository.ninja[0].height,
                imageRepository.ninja);

            this.homeworks = [];
            this.stars = [];

            return true;
        } else {
            return false;
        }
    };

    this.start = function () {
        this.updateFrame();
        this.drawFrame();
        showPoints();
    }

    this.updateFrame = function () {
        self.moveObjects();
        self.addNewObjects();
        self.detectCollision();
        self.removeDeadObjects();

        if (!self.ninja.isAlive) {
            drawGameOverScreen(Raphael(0, 0, 800, 600), self.ninja.points);
            return;
        }

        if (self.currentFrame % 3 === 0) {
            setTimeout(self.updateFrame, 16);
        }
        else {
            setTimeout(self.updateFrame, 17);
        }
        ++self.currentFrame;
    }
    
    this.moveObjects = function () {
        this.ninja.update();
        this.ninja.move(
                0,
                0,
                this.canvas.width,
                this.canvas.height);

        for (var i = 0, len = this.homeworks.length; i < len; ++i) {
            this.homeworks[i].move(
                0,
                0,
                this.canvas.width,
                this.canvas.height);
        }

        for (var i = 0, len = this.stars.length; i < len; ++i) {
            this.stars[i].move(
                0,
                0,
                this.canvas.width,
                this.canvas.height);
        }
    }
    
    this.addNewObjects = function () {
        // Add a star when ninja firing on click
        if (controls.leftButtonClick && this.currentFrame - this.frameAtFire > 30) {

            this.frameAtFire = this.currentFrame;

            var starSpawnPoint = {
                x: this.ninja.x + this.ninja.width / 2,
                y: this.ninja.y + this.ninja.height / 2
            },
                starTargetPoint = {
                    x: controls.cursorX,
                    y: controls.cursorY
                },
                starDirection = getVectorWithLength(5, starSpawnPoint, starTargetPoint);

            var newStar = new Star(
                starSpawnPoint.x,
                starSpawnPoint.y,
                imageRepository.star.width,
                imageRepository.star.height,
                starDirection.x,
                starDirection.y);

            self.stars.push(newStar);
        }

        // Add a homework if it's time
        if (this.currentFrame % 60 === 0) {
            var spawnPoint = {
                x: this.canvas.width,
                y: Math.floor((Math.random() *
                    (this.canvas.height - imageRepository.homeWork.height)) + 1)
            },
                targetPoint = {
                    x: 0,
                    y: Math.floor((Math.random() *
                        (this.canvas.height - imageRepository.homeWork.height)) + 1)
                },
                direction = getVectorWithLength(5, spawnPoint, targetPoint);

            var newHomework = new Homework(
                spawnPoint.x,
                spawnPoint.y,
                imageRepository.homeWork.width,
                imageRepository.homeWork.height,
                direction.x,
                direction.y);

            self.homeworks.push(newHomework);
        }
    }

    this.detectCollision = function () {
        // Detect collision between stars and homeworks
        for (var i = 0, homeworksLen = this.homeworks.length; i < homeworksLen; ++i) {
            for (var j = 0, starsLen = this.stars.length; j < starsLen; ++j) {
                this.homeworks[i].collideWith(this.stars[j]);
                this.stars[j].collideWith(this.homeworks[i]);
            }
        }

        // Detect collisions between ninja and homeworks
        for (var i = 0, homeworksLen = this.homeworks.length; i < homeworksLen; ++i) {
            this.homeworks[i].collideWith(this.ninja);
            this.ninja.collideWith(this.homeworks[i]);
        }
    }

    this.removeDeadObjects = function () {
        // Remove dead homeworks
        for (var i = 0, len = this.homeworks.length; i < len; ++i) {
            if (!this.homeworks[i].isAlive) {
                this.homeworks.splice(i, 1);
                --i;
                --len;
                self.ninja.points++;
            }
        }

        //Remove dead stars
        for (var i = 0, len = this.stars.length; i < len; ++i) {
            if (!this.stars[i].isAlive) {
                this.stars.splice(i, 1);
                --i;
                --len;
            }
        }
    }

    this.drawFrame = function () {
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

        $('#current-points').text(self.ninja.points);

        if (!self.ninja.isAlive) {
            return;
        }

        self.background.draw(self.context);
        self.ninja.draw(self.context);

        for (var i = 0, len = self.homeworks.length; i < len; ++i) {
            self.homeworks[i].draw(self.context);
        }

        for (var i = 0, len = self.stars.length; i < len; ++i) {
            self.stars[i].draw(self.context);
        }

        requestAnimationFrame(self.drawFrame);
    }

}

function isColliding(firstObject, secondObject) {
    if (firstObject.x < secondObject.x + secondObject.width &&
            firstObject.x + firstObject.width > secondObject.x &&
            firstObject.y < secondObject.y + secondObject.height &&
            firstObject.y + firstObject.height > secondObject.y) {
        return true;
    }

    return false;
}

function getVectorWithLength(length, fromPoint, toPoint) {
    var unitVector = {},
        deltaX = toPoint.x - fromPoint.x,
        deltaY = toPoint.y - fromPoint.y,
        originalLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    unitVector.x = deltaX / originalLength;
    unitVector.y = deltaY / originalLength;

    return {
        x: unitVector.x * length,
        y: unitVector.y * length
    };
}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();