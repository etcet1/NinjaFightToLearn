//http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/

/**
 * Initialize the Game and starts it.
 */
var game = new Game();

function init() {
    game.init();
}

/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
    /*
     * Gets canvas information and context and sets up all game
     * objects.
     * Returns true if the canvas is supported and false if it
     * is not. This is to stop the animation script from constantly
     * running on older browsers.
     */
	var self = this;
    
    this.init = function () {
        console.log("game init");

        drawStartScreen(Raphael(0, 0, 800, 600));

        $(document).on('click', '#startButton', function () {
            clearStartScreen();
            self.start();
        });

        $(document).on('click', '#aboutButton', function () {
            clearStartScreen();
            drawAboutScreen(Raphael(0, 0, 800, 600));
        });
        
        this.canvas = document.getElementById('game-canvas');
        
        if (this.canvas.getContext) {
            this.context = this.canvas.getContext('2d');
            this.background = new Background(imageRepository.background);
            
            this.ninja = new Ninja(
                0,
                0,
                imageRepository.ninja[0].width,
                imageRepository.ninja[0].height,
                imageRepository.ninja);

            this.homeworks = [];
            var testHomework = new Homework(150,150,100,100);
            testHomework.speedX = 3;
            this.homeworks.push (testHomework);
            
            this.stars = [];
            var testStar = new Star(100,100,20,20);
            testStar.speedX = 5;
            testStar.speedY = 5;
            this.stars.push( testStar );

            return true;
        } else {
            return false;
        }
    };

    this.start = function(){
        console.log("started");
        console.log(self);
        console.log(this);
        this.updateFrame();
        this.drawFrame();
    }
    
    this.updateFrame = function(){
        // console.log("update");
        // console.log(self.ninja);
        // console.log(self);
        // console.log(this);
        self.moveObjects();
        self.addNewObjects();
        self.detectCollision();
        self.removeDeadObjects();
        
        if (!self.ninja.isAlive){
            // TODO: Show defeat screen
            return;
        }
        
        setTimeout(self.updateFrame, 1000 / 60);
    }
    
    this.moveObjects = function (){
        // console.log(this.homeworks);
        this.ninja.move();
       
        for ( var i = 0, len = this.homeworks.length;i < len;++i ){
            this.homeworks[i].move(
                0,
                0,
                this.canvas.width,
                this.canvas.height);
        }
        
        for ( var i = 0, len = this.stars.length;i < len;++i ){
            this.stars[i].move(
                0,
                0,
                this.canvas.width,
                this.canvas.height);
        }
        
        // console.log(this.stars);
        // console.log(this.homeworks);
    }
    
    this.addNewObjects = function(){
        // TODO: add a star if player is currently shooting one
        // TODO: add a homework if it is time for it
    }
    
    this.detectCollision = function(){
        // Detect collision between stars and homeworks
        for ( var i = 0, homeworksLen = this.homeworks.length;i < homeworksLen;++i ){
            for ( var j = 0, starsLen = this.stars.length;j < starsLen;++j ){
                this.homeworks[i].collideWith(this.stars[j]);
                this.stars[j].collideWith(this.homeworks[i]);
            }
        }
        
        // Detect collisions between ninja and homeworks
    }
    
    this.removeDeadObjects = function(){
        // Remove dead homeworks
        // console.log(this,self);
        // console.log(this.homeworks.length);
        for ( var i = 0, len = this.homeworks.length;i < len;++i ){
            // console.log(i, len);
            if ( !this.homeworks[i].isAlive ) {
                this.homeworks.splice(i, 1);
                --i;
                --len;
            }
        }
        
        //Remove dead stars
        for ( var i = 0, len = this.stars.length;i < len;++i ){
            if ( !this.stars[i].isAlive ){
                this.stars.splice(i, 1);
                --i;
                --len;
            }
        }
    }
    
    this.drawFrame = function(){
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.background.draw(self.context);
        self.ninja.draw(self.context);
        
        // console.log(self);
        
        for ( var i = 0, len = self.homeworks.length;i < len;++i ){
            self.homeworks[i].draw(self.context);
        }
        
        for ( var i = 0, len = self.stars.length;i < len;++i ){
            self.stars[i].draw(self.context);
        }
        
        requestAnimationFrame(self.drawFrame);
    }
    
// Start the animation loop this.start = function() { animate(); }; } 
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
// function animate() {
    // requestAnimFrame(animate);
    // game.background.draw();
// }

/** * requestAnim shim layer by Paul Irish * Finds the first API that works to optimize the animation loop, * otherwise defaults to setTimeout(). */ 
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();