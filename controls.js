var controls = new function () {

    // Define currently pressed key controls

    //asigning variable to the instance of the object
    var self = this;

    //pressed keys array
    self.pressedKeys = {};

    //mouse events
    self.cursorX = 0;
    self.cursorY = 0;
    self.leftButtonClick = false;


    self.keyPress = function (e) {

        var key;

        //IE
        if (window.event) {
            key = e.keyCode;
        } else {
            key = e.which;
        }

        //directions
        if (key === 37 || key === 38 || key === 39 || key === 40) {
            self.pressedKeys[key] = true;
        }

        //console.log(self.pressedKeys);
    };

    self.mouseClick = function (e) {
        var buttonClicked;

        //IE
        if (window.event) {
            buttonClicked = e.button;
        } else {
            buttonClicked = e.which;
        }

        if (buttonClicked == 1) {
            self.leftButtonClick = true;
            self.cursorX = e.pageX;
            self.cursorY = e.pageY;
        }

       // console.log(self.cursorX);
       // console.log(self.cursorY);
       // console.log(self.leftButtonClick);
    };

    self.keyPressEnd = function (e) {

        var key;

        //IE
        if (window.event) {
            key = e.keyCode;
        } else {
            key = e.which;
        }

        //directions
        if (key === 37 || key === 38 || key === 39 || key === 40) {
            self.pressedKeys[key] = false;
        }
    };

//    self.mouseClickEnd = function () {
//        self.leftButtonClick = false;
//       // console.log(self.leftButtonClick);
//    };

    document.addEventListener('keydown', self.keyPress);
    document.addEventListener('onmousedown', self.mouseClick, false);

    document.addEventListener('keyup', self.keyPressEnd);
//    document.addEventListener('mouseup', self.mouseClickEnd, false);
}

