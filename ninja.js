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
