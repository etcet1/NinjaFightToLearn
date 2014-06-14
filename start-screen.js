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
        y: paperHeight - eggHeight
    }, 1000);

    setTimeout(function () {
        //draw main screen buttons
        drawScreenButton("Start", "absolute", 280, 230, "startButton");
        drawScreenButton("Help", "absolute", 280, 470, "aboutButton");

        $(document).on('click', '#startButton', function () {
            clearStartScreen();
            game.start();
        });

        $(document).on('click', '#aboutButton', function () {
            clearStartScreen();
            drawAboutScreen(Raphael(0, 0, 800, 600));
        });
    }, 1200);
}

function drawAboutScreen(paper) {
    var paperWidth = paper.width,
        paperHeight = paper.height;

    drawText(paper, paperWidth / 2, paperHeight / 8, "Ninja Fight To Learn", 45, "black");

    drawText(paper, 100, 200, "Controls", 35, "black");
    drawText(paper, 150, 255, "Move left", 30, "black");
    paper.image("images/left-arrow.svg", 50, 240, 30, 30);
    drawText(paper, 145, 295, "Move up", 30, "black");
    paper.image("images/up-arrow.svg", 50, 280, 30, 30);
    drawText(paper, 160, 335, "Move right", 30, "black");
    paper.image("images/right-arrow.svg", 50, 320, 30, 30);
    drawText(paper, 167, 375, "Move down", 30, "black");
    paper.image("images/down-arrow.svg", 50, 360, 30, 30);
    drawText(paper, 125, 423, "Shoot", 30, "black");
    paper.image("images/mouse.svg", 50, 400, 30, 45);

    drawText(paper, 570, 200, "Hints", 35, "black");
    drawText(paper, 570, 255, "You should avoid collision with homeworks.", 20, "black");
    paper.image("images/homework.png", 550, 270, 40, 60);
    drawText(paper, 570, 350, "They are deadly. Don't touch them.", 20, "black");
    drawText(paper, 570, 380, "You can kill them with stars.", 20, "black");
    paper.image("images/star.png", 550, 395, 40, 40);

    drawScreenButton("Back", "absolute", 500, 350, "backButton");

    drawText(paper, 400, 580, "Copyright (c) 2014 Telerik Academy Team \"Mavado\"", 15, "black");

    $(document).on('click', '#backButton', function () {
        clearStartScreen();
        drawStartScreen(Raphael(0, 0, 800, 600));
    });
}

function clearStartScreen() {
    var paper = document.getElementsByTagName('svg')[0];
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].remove();
        i--;
    }
    paper.remove();
}

function drawScreenButton(text, position, top, left, id) {
    var startButton = document.createElement('button');
    startButton.innerHTML = text;
    startButton.style.position = position;
    startButton.style.top = top + "px";
    startButton.style.left = left + "px";
    startButton.id = id;
    document.body.appendChild(startButton);
}

function drawText(paper, x, y, textToDraw, fontSize, color) {
    var posX = x,
        posY = y,
        text = textToDraw,
        drawnText = paper.text(posX, posY, text);

    drawnText.attr({
        "font-weight": "bold",
        "font-size": fontSize,
        "font-family": "Arial, Calibri",
        fill: color
    });
}