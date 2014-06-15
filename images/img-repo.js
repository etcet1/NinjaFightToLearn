window.addEventListener("load", function() {
    window.imageRepository = new function () {
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
                window.init();
            }
        }

        this.background.onload = function () {
            imageLoaded();
        }
        
        this.ninja[0].onload = function () {
            imageLoaded();
            console.log("ninja1 loaded");
        }
        this.ninja[1].onload = function () {
            imageLoaded();
        }
        this.ninja[2].onload = function () {
            imageLoaded();
        }
        
        this.homeWork.onload = function () {
            imageLoaded();
        }
        
        this.star.onload = function () {
            imageLoaded();
        }
    }
}, false);
