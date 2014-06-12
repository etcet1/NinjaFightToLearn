//http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/

/**
 * Initialize the Game and starts it.
 */
var game = new Game();

function init() {
    if (game.init()) {
        game.start();
    }
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
    this.init = function () {

        drawStartScreen(Raphael(0, 0, 800, 600));
            

        $(document).on('click', '#startButton', function () {
            clearStartScreen();
        });

//        Get the canvas element
        this.bgCanvas = document.getElementById('background');
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            // Initialize the background object
            this.background = new Background();
            this.background.init(0, 0); // Set draw point to 0,0

            Ninja.prototype.context = this.bgContext;
            this.ninja = new Ninja();
            this.ninja.init(); // Set draw point to 0,0


            return true;
        } else {
            return false;
        }
    };

// Start the animation loop this.start = function() { animate(); }; } 
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
    requestAnimFrame(animate);
    game.background.draw();
}

/** * requestAnim shim layer by Paul Irish * Finds the first API that works to optimize the animation loop, * otherwise defaults to setTimeout(). */ window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (/* function */ callback, /* DOMElement */ element) {
        window.setTimeout(callback, 1000 / 60);
    };
})();