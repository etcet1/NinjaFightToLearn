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

    setTimeout(function(){
        //draw main screen buttons
        drawScreenButton("Start", "absolute", 250, 230, "startButton");
        drawScreenButton("About", "absolute", 250, 460, "aboutButton");
    }, 1200);
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

    drawScreenButton("Back", "absolute", 400, 50, "backButton");

    $(document).on('click', '#backButton', function () {
        clearStartScreen();
        drawStartScreen(Raphael(0, 0, 800, 600));
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

function drawScreenButton (text, position, top, left, id){
    var startButton = document.createElement('button');
    startButton.innerHTML = text;
    startButton.style.position = position;
    startButton.style.top = top + "px";
    startButton.style.left = left + "px";
    startButton.id = id;
    document.body.appendChild(startButton);
}