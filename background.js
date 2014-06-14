/**
 * Creates the Background object which will become a child of
 * the Drawable object. The background is drawn on the "background"
 * canvas and creates the illusion of moving by panning the image.
 */
function Background(image) {
    var backgroundImage = image;
    this.draw = function (context) {
        context.drawImage(backgroundImage, 0, 0, context.canvas.width, context.canvas.height);
    }
}
