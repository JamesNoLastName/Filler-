const gameList = [];

// Function to initialize game list with random games
function initializeGameList() {
    const numGames = Math.floor(Math.random() * 3) + 2; // Randomly choose between 2 to 4 games
    for (let i = 0; i < numGames; i++) {
        gameList.push(getRandomGame());
    }
}

// Random game generator
function getRandomGame() {
    const gameName = `Bot Game ${Math.floor(Math.random() * 100)}`;
    return gameName;
}

// Add a game to the list
function addGame() {
    const gameName = getRandomGame();
    gameList.push(gameName); // Add new game to the list
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

// Update the game list display
function updateGameList() {
    const gameListDiv = document.querySelector('.game-list');
    gameListDiv.innerHTML = ''; // Clear current list

    if (gameList.length === 0) {
        gameListDiv.innerHTML = '<p>No games currently available.</p>';
    } else {
        gameList.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.className = 'game-item';
            gameItem.textContent = game;
            gameListDiv.appendChild(gameItem);
        });
    }
}

// Initialize the game list with random games
initializeGameList();
updateGameList();

// Randomly add and remove games at intervals
setInterval(() => {
    addGame();
    const removeDelay = ((Math.random() * (8000 - 3000 + 1))) + 1234;
    setTimeout(removeGame, removeDelay);
}, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000); // Add game every 2 to 5 seconds
