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

