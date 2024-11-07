const gameList = [];
const players = ['Yes', 'No'];
const times = ['1+0', '1+1', '3+2', '5+0', '5+3', '10+0', '10+10', '30+0'];
const boardSizes = ['7x6', '7x7', '8x8', '8x10', '10x10', '15x15'];
const modes = ['Classic', 'Square'];
const gameWindow = document.getElementById('gameWindow');
const gameDetails = document.getElementById('gameDetails');
const closeGameButton = document.getElementById('closeGameButton');
const gameBoard = document.getElementById('gameBoard');

function initializeGameList() {
    const numGames = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numGames; i++) {
        gameList.push(getRandomGame());
    }
}

function getRandomGame() {
    const player = players[Math.floor(Math.random() * players.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const boardSize = boardSizes[Math.floor(Math.random() * boardSizes.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    
    return { player, time, boardSize, mode };
}

function addGame() {
    const game = getRandomGame();
    gameList.push(game);
    updateGameList();
}

function removeGame() {
    if (gameList.length > 0) {
        const index = Math.floor(Math.random() * gameList.length);
        const gameItem = document.querySelectorAll('.game-item')[index];

        // Add greyed-out class
        gameItem.classList.add('greyed-out');

        // Wait 3 seconds before removing
        setTimeout(() => {
            gameList.splice(index, 1);
            updateGameList();
        }, 3000);
    }
}

function createGameGrid(rows, cols) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear previous content
    gameBoard.style.setProperty('--rows', rows); // Set custom property for rows
    gameBoard.style.setProperty('--cols', cols); // Set custom property for columns
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // Set columns
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`; // Set rows

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell'); // Add cell class
        gameBoard.appendChild(cell);
    }
}

function updateGameList() {
    const gameListDiv = document.querySelector('.game-list');
    gameListDiv.innerHTML = '';

    if (gameList.length === 0) {
        gameListDiv.innerHTML = '<p>No games currently available.</p>';
    } else {
        let htmlString = '<table class="game-list-table"><tbody>';

        gameList.forEach((game, index) => {
            htmlString += `
                <tr class="game-item" data-index="${index}">
                    <td>${game.player}</td>  
                    <td>${game.time}</td>  
                    <td>${game.boardSize}</td>  
                    <td>${game.mode}</td>
                </tr>
            `;
        });

        htmlString += '</tbody></table>';
        gameListDiv.innerHTML = htmlString;
        const gameItems = document.querySelectorAll('.game-item');
        gameItems.forEach(item => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('greyed-out')) {
                    const index = item.getAttribute('data-index');
                    const game = gameList[index];
                    gameDetails.textContent = `Player: ${game.player}, Time: ${game.time}, Board Size: ${game.boardSize}, Mode: ${game.mode}`;
                    const [cols, rows] = game.boardSize.split('x').map(Number);
                    createGameGrid(rows, cols);
                    gameWindow.style.display = 'flex';
                }
            });
        });
    }
}

function handleCellClick(cell) {
    cell.style.backgroundColor = 'lightblue'; // Change this to your desired action
}

closeGameButton.addEventListener('click', () => {
    gameWindow.style.display = 'none';
});

initializeGameList();
updateGameList();

setInterval(() => {
    addGame();
    const removeDelay = ((Math.random() * (8000 - 3000 + 1))) + 1234;
    setTimeout(removeGame, removeDelay);
}, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);

function createGameGrid(rows, cols) {
    const gameBoard = document.getElementById('gameBoard');
    const colorButtonsContainer = document.getElementById('colorButtons');
    gameBoard.innerHTML = ''; // Clear previous content
    colorButtonsContainer.innerHTML = ''; // Clear previous buttons

    // Cell size in vh (viewport height)
    const cellSize = 5; // 5vh per cell (adjust as needed)
    
    // Set the grid layout (keep this for the grid styling)
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // Set columns
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`; // Set rows

    // Calculate the width and height of the grid based on the number of rows and columns
    const boardWidth = cols * cellSize; // Total width = cols * cell size
    const boardHeight = rows * cellSize; // Total height = rows * cell size

    // Set the game board size dynamically
    gameBoard.style.width = `${boardWidth}vh`; // Width based on cells
    gameBoard.style.height = `${boardHeight}vh`; // Height based on cells

    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell'); // Add cell class
        gameBoard.appendChild(cell);
    }

    // Create color buttons and add them to the container
    const colors = ['red', 'blue', 'yellow', 'green', 'black', 'magenta'];
    colors.forEach(color => {
        const button = document.createElement('div');
        button.classList.add('color-button', color);
        button.addEventListener('click', () => {
            console.log(`${color} button clicked`); // Placeholder for button click logic
        });
        colorButtonsContainer.appendChild(button);
    });

    // Recalculate button position after grid is created
    positionButtonsBelowGrid();
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
