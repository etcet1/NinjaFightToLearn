function Background(image) {
    var backgroundImage = image;
    this.draw = function (context) {
        context.drawImage(backgroundImage, 0, 0, context.canvas.width, context.canvas.height);
    }
}
