function drawStartScreen(paper) {
    var paperWidth = paper.width,ieuyer
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

    function addMenuButtons() {
        var startButton = document.createElement('button');
        startButton.innerHTML = "Start";
        startButton.style.position = "absolute";
        startButton.style.top = "250px";
        startButton.id = "startButton";
        startButton.style.left = "230px";
        // startButton.onclick = startGame; // change the function
        document.body.appendChild(startButton);

        var aboutButton = document.createElement('button');
        aboutButton.innerHTML = "About";
        aboutButton.style.position = "absolute";
        aboutButton.style.top = "250px";
        aboutButton.id = "aboutButton";
        aboutButton.style.left = "460px";
        // aboutButton.onclick = aboutGame; // change the function
        document.body.appendChild(aboutButton);
    }

    setTimeout(addMenuButtons, 1200);
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