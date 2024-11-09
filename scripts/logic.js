const playerColors = [];
const colors = ["green", "red", "blue", "black", "yellow", "magenta"];
let player = 0;
console.log("logic.js loaded");

function initializeLogic(board) {
    console.log("Board passed to logic.js:", board);
    playerColors[0] = board[board.length - 1][0].style.backgroundColor;
    playerColors[1] = board[0][board[0].length - 1].style.backgroundColor;
    console.log(playerColors[0]);
    console.log(playerColors[1]);
}

function greenButton() {
    console.log("Green button clicked!");
    pressButton("green");
}

function redButton() {
    console.log("Red button clicked!");
    pressButton("red");
}

function blueButton() {
    console.log("Blue button clicked!");
    pressButton("blue");
}

function yellowButton() {
    console.log("Yellow button clicked!");
    pressButton("yellow");
}

function blackButton() {
    console.log("Black button clicked!");
    pressButton("black");
}

function magentaButton() {
    console.log("Magenta button clicked!");
    pressButton("magenta");
}

function pressButton(color) {
    const previousColor = playerColors[player];
    playerColors[player] = color;
    console.log(`Player ${player + 1} chose ${color}`);
    updatePlayerTile(player, color);
    disableSelectedButtons();
    reenablePreviousColor(previousColor);
    player = (player + 1) % 2;
}

function updatePlayerTile(player, color) {
    if (player === 0) {
        board[board.length - 1][0].style.backgroundColor = color;
    } else {
        board[0][board[0].length - 1].style.backgroundColor = color;
    }
    console.log(`Player ${player + 1}'s tile updated to ${color}`);
}

function disableSelectedButtons() {
    const colorButtonsContainer = document.getElementById('colorButtons');
    const buttons = colorButtonsContainer.querySelectorAll('.color-button');
    
    buttons.forEach(button => {
        const buttonColor = button.id;

        if (playerColors.includes(buttonColor)) {
            button.classList.add('disabled');
            button.style.pointerEvents = 'none';
        }
    });
}

function reenablePreviousColor(previousColor) {
    if (previousColor) {
        const colorButtonsContainer = document.getElementById('colorButtons');
        const buttons = colorButtonsContainer.querySelectorAll('.color-button');
        
        buttons.forEach(button => {
            const buttonColor = button.id;  
            if (buttonColor === previousColor && !playerColors.includes(buttonColor)) {
                button.classList.remove('disabled');
                button.style.pointerEvents = 'auto'; 
            }
        });
    }
}
