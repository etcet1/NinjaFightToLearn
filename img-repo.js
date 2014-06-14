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
    this.background.src = "images/background.png";
    
    this.ninja = [new Image(),new Image(), new Image()];
    this.ninja[0].src = "images/ninja-left-1.png";
    this.ninja[1].src = "images/ninja-left-2.png";
    this.ninja[2].src = "images/ninja-left-3.png";
    
    this.homeWork = new Image();
    this.homeWork.src = "images/homework.png";
    
    this.star = new Image();
    this.star.src = "images/star.png";
    
    // Ensure all images have loaded before starting the game
    var numImages = 6;
    var numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            console.log("window.init");
            window.init();
        }
    }

    this.background.onload = function () {
        imageLoaded();
        console.log("bg loaded");
    }
    
    this.ninja[0].onload = function () {
        imageLoaded();
        console.log("ninja1 loaded");
    }
    this.ninja[1].onload = function () {
        imageLoaded();
        console.log("ninja2 loaded");
    }
    this.ninja[2].onload = function () {
        imageLoaded();
        console.log("ninja3 loaded");
    }
    
    this.homeWork.onload = function () {
        imageLoaded();
        console.log("hw loaded");
    }
    
    this.star.onload = function () {
        imageLoaded();
        console.log("star loaded");
    }

// Set images src this.background.src = "imgs/bg.png"; this.spaceship.src = "imgs/ship.png"; this.bullet.src = "imgs/bullet.png"; } 
// Set images src this.background.src = "imgs/bg.png"; }

}
