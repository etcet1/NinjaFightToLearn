var controls = new function () {

    // Define currently pressed key controls

    //pressed keys array
    this.pressedKeys = [];

    //mouse events
    this.cursorX = 0;
    this.cursorY = 0;
    this.leftButtonClick = false;


    this.keyPress = function (e) {

        var key;

        //IE
        if (window.event) {
            key = e.keyCode;
        } else {
            key = e.which;
        }

        //directions
        if (key === 37 || key === 38 || key === 39 || key === 40) {
            if (this.pressedKeys.indexOf(key) === -1) {
                this.pressedKeys.push(key);
            }
        }
    };

    this.mouseMove = function (e) {
        this.cursorX = e.pageX;
        this.cursorY = e.pageY;
    };

    this.mouseClick = function (e) {
        var buttonClicked;

        //IE
        if (window.event) {
            buttonClicked = e.button;
        } else {
            buttonClicked = e.which;
        }

        if (buttonClicked == 1) {
            this.leftButtonClick = true;
        }
    };
}
