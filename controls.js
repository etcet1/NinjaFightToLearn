window.addEventListener("load", function() {
    window.controls = new function () {

        // Define currently pressed key controls

        //asigning variable to the instance of the object
        var self = this;
        var gameField = document.getElementById('game-canvas');


        //pressed keys array
        self.pressedKeys = {};

        //mouse events
        self.cursorX = 0;
        self.cursorY = 0;
        self.leftButtonClick = false;

        self.keyPress = function (e) {
            e.preventDefault();
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
        };

        self.mouseClick = function (e) {
            var buttonClicked;
            var buttonCode;

            if (window.event) {
                buttonClicked = e.button;
                buttonCode = 0;
            } else {
                buttonClicked = e.which;
                buttonCode = 1;
            }

            if (buttonClicked === buttonCode) {
                self.leftButtonClick = true;
            }
        };

        self.keyPressEnd = function (e) {
            e.preventDefault();
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

        self.mouseClickEnd = function () {
            self.leftButtonClick = false;
        };
        
        self.mouseMove = function(e) {
            var currStyle = window.getComputedStyle(this);
            
            self.cursorX = e.pageX -
                this.offsetLeft - 
                parseInt(currStyle.getPropertyValue("border-left-width")) - 
                parseInt(currStyle.getPropertyValue("padding-left"));
            self.cursorY = e.pageY -
                this.offsetTop -
                parseInt(currStyle.getPropertyValue("border-top-width")) - 
                parseInt(currStyle.getPropertyValue("padding-top"));
        }

        window.addEventListener('keydown', self.keyPress, false);
        gameField.addEventListener('mousedown', self.mouseClick, false);

        window.addEventListener('keyup', self.keyPressEnd);
        gameField.addEventListener('mouseup', self.mouseClickEnd, false);
        
        gameField.addEventListener('mousemove', self.mouseMove, false);
    }
}, false);