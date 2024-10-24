const gameList = [];

const players = ['1', '2']; // Renamed to plural
const times = ['1 + 0', '1 + 1', '3 + 2', '5 + 0', '5 + 3', '10 + 0', '10 + 10', '30 + 0'];
const boardSizes = ['7x6', '7x7', '8x8', '8x10', '10x10', '15x15'];
const modes = ['Classic', 'Square'];

function initializeGameList() {
    const numGames = Math.floor(Math.random() * 3) + 2; // Randomly choose between 2 to 4 games
    for (let i = 0; i < numGames; i++) {
        gameList.push(getRandomGame());
    }
}

function getRandomGame() {
    const gameName = `Bot Game ${Math.floor(Math.random() * 100)}`;
    const player = players[Math.floor(Math.random() * players.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const boardSize = boardSizes[Math.floor(Math.random() * boardSizes.length)];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    
    return { gameName, player, time, boardSize, mode }; // Return an object with game details
}

// Add a game to the list
function addGame() {
    const game = getRandomGame();
    gameList.push(game); // Add new game to the list
    updateGameList();
}

// Remove a random game from the list
function removeGame() {
    if (gameList.length > 0) {
        const index = Math.floor(Math.random() * gameList.length);
        gameList.splice(index, 1); // Remove a random game from the list
        updateGameList();
    }
}

function updateGameList() {
    const gameListDiv = document.querySelector('.game-list');
    gameListDiv.innerHTML = ''; // Clear current list

    if (gameList.length === 0) {
        gameListDiv.innerHTML = '<p>No games currently available.</p>';
    } else {
        // Build the HTML string
        let htmlString = '';

        gameList.forEach(game => {
            htmlString += `
                <div class="game-item">
                    <p>
                        <span class="game-info">${game.gameName}</span> | 
                        <span class="game-info">${game.player}</span> | 
                        <span class="game-info">${game.time}</span> | 
                        <span class="game-info">${game.boardSize}</span> | 
                        <span class="game-info">${game.mode}</span>
                    </p>
                </div>
            `;
        });

        gameListDiv.innerHTML = htmlString;
    }
}

initializeGameList();
updateGameList();

setInterval(() => {
    addGame();
    const removeDelay = ((Math.random() * (8000 - 3000 + 1))) + 1234;
    setTimeout(removeGame, removeDelay);
}, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000); // Add game every 2 to 5 seconds
