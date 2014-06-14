
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