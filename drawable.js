/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
    this.init = function (x, y, width, height) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.collidableWith = "";
    this.isColliding = false;
    this.type = "";

// Define abstract function to be implemented in child objects this.draw = function() { }; this.move = function() { }; this.isCollidableWith = function(object) { return (this.collidableWith === object.type); }; }

// Define abstract function to be implemented in child objects this.draw = function() { }; }
}
/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background() {
    this.speed = 0; // Redefine speed of the background for panning
    // Implement abstract function
    this.draw = function () {
        // Pan background
        this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

// If the image scrolled off the screen, reset if (this.y >= this.canvasHeight) this.y = 0; }; } // Set Background to inherit properties from Drawable Background.prototype = new Drawable();
    }
}

function Ninja() {
    this.speed = 0; // Redefine speed of the background for panning

    this.init = function (x, y, width, height) {
        // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Implement abstract function
    this.draw = function () {
        // Pan background
        this.y += this.speed;
        this.context.drawImage(imageRepository.ninja, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.ninja, this.x, this.y - this.canvasHeight);

// If the image scrolled off the screen, reset if (this.y >= this.canvasHeight) this.y = 0; }; } // Set Background to inherit properties from Drawable Background.prototype = new Drawable();
    }

    this.move = function () {

    };
}
/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function () {
    // Define images
    this.background = new Image();
    this.ninja = new Image();
    this.homeWork = new Image();
    // Ensure all images have loaded before starting the game
    var numImages = 3;
    var numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }

    this.background.onload = function () {
        imageLoaded();
    }
    this.ninja.onload = function () {
        imageLoaded();
    }
    this.homeWork.onload = function () {
        imageLoaded();
    }

// Set images src this.background.src = "imgs/bg.png"; this.spaceship.src = "imgs/ship.png"; this.bullet.src = "imgs/bullet.png"; } 
// Set images src this.background.src = "imgs/bg.png"; }

}

function drawStartScreen(paper) {
    var paperWidth = paper.width,
        paperHeight = paper.height,
        ninjaWidth = 133,
        ninjaHeight = 170,
        ninjaPosX = (paperWidth / 2) - (ninjaWidth / 2),
        ninjaPosY = (paperHeight / 2) - (ninjaHeight / 2),
        ninja = paper.image("images/ninja.png", ninjaPosX, ninjaPosY, ninjaWidth, ninjaHeight),
        eggWidth = 280,
        eggHeight = 190,
        eggUpPosX = (paperWidth / 2) - (eggWidth / 2),
        eggUpPosY = (paperHeight / 2) - eggHeight + 30,
        eggDownPosX = eggUpPosX,
        eggDownPosY = (paperHeight / 2) - 30,
        eggUp = paper.image("images/egg-up.png", eggUpPosX, eggUpPosY, eggWidth, eggHeight),
        eggDown = paper.image("images/egg-down.png", eggDownPosX, eggDownPosY, eggWidth, eggHeight);

    ninja.rotate(100, ninjaPosX + ninjaWidth / 2, ninjaPosY + ninjaHeight / 2);
    ninja.animate({
        transform: "r0" + "," + (ninjaPosX + ninjaWidth / 2) + "," + (ninjaPosY + ninjaHeight / 2)
    }, 800);

    eggUp.animate({
        y: 0
    }, 1000);
    eggDown.animate({
        y: eggHeight * 2
    }, 1000);

    function addMenuButtons() {
        var startButton = document.createElement('button');
        startButton.innerHTML = "Start";
        startButton.style.position = "absolute";
        startButton.style.top = "250px";
        startButton.id = "startButton";
        startButton.style.left = "230px";
        // startButton.onclick = startGame; // change the function
        document.body.appendChild(startButton);

        var aboutButton = document.createElement('button');
        aboutButton.innerHTML = "About";
        aboutButton.style.position = "absolute";
        aboutButton.style.top = "250px";
        aboutButton.id = "aboutButton";
        aboutButton.style.left = "460px";
        // aboutButton.onclick = aboutGame; // change the function
        document.body.appendChild(aboutButton);
    }

    setTimeout(addMenuButtons, 1200);
}

function drawAboutScreen(paper) {
    var paperWidth = paper.width,
        paperHeight = paper.height,
        aboutTextPosX = (paperWidth / 2),
        aboutTextPosY = (paperHeight / 3),
        text = "Some stupid about text";

    var aboutText = paper.text(aboutTextPosX, aboutTextPosY, text);

    aboutText.attr({
        "font-weight": "bold",
        "font-size": 16,
        "font-family": "Calibri, Arial",
        fill: "black"
    });
}

function clearStartScreen() {
    var paper = document.getElementsByTagName('svg')[0];
    var buttons = document.getElementsByTagName('button');
    for(var i = 0; i < buttons.length; i++){
        buttons[i].remove();
        i--;
    }
    paper.remove();
}