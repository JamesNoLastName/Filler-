const playerColors = [];
const colors = ["green", "red", "blue", "black", "yellow", "magenta"];

function pressButton(color) {
    console.log(`${color} button clicked!`);
    changePlayerColor(color);  // Assuming this function is defined elsewhere
}

document.getElementById('green').addEventListener('click', function() {
    console.log('Green button clicked!');
    pressButton("green");
});

document.getElementById('red').addEventListener('click', function() {
    console.log('Red button clicked!');
    pressButton("red");
});

document.getElementById('blue').addEventListener('click', function() {
    console.log('Blue button clicked!');
    pressButton("blue");
});

document.getElementById('yellow').addEventListener('click', function() {
    console.log('Yellow button clicked!');
    pressButton("yellow");
});

document.getElementById('black').addEventListener('click', function() {
    console.log('Black button clicked!');
    pressButton("black");
});

document.getElementById('magenta').addEventListener('click', function() {
    console.log('Magenta button clicked!');
    pressButton("magenta");
});


// Assuming you have a function to handle board initialization
function initializeLogic(board) {
    console.log("Board passed to logic.js:", board);
    playerColors[0] = board[0][board[0].length - 1].style.backgroundColor;
    playerColors[1] = board[board.length - 1][0].style.backgroundColor;
}


// Function to handle button click
function pressButton(color) {
    console.log(`${color} button clicked!`);
    // You can include logic here to change player color, update game state, etc.
    changePlayerColor(color);
}

// Function to position color buttons below the grid
function positionButtonsBelowGrid() {
    const gameBoard = document.getElementById('gameBoard');
    const colorButtonsContainer = document.getElementById('colorButtons');
    
    // Get the bottom position of the game board
    const gameBoardBottom = gameBoard.getBoundingClientRect().bottom;

    // Set margin-top of the color buttons container to push it just below the grid
    colorButtonsContainer.style.marginTop = `${gameBoardBottom + 20}px`; // Add 20px for a small gap
}

// Example function to change the player color (replace with your logic)
function changePlayerColor(color) {
    // Logic to change player color
    console.log(`Changing player color to ${color}`);
}