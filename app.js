const gameList = [];
const players = ['Yes', 'No'];
const times = ['1+0', '1+1', '3+2', '5+0', '5+3', '10+0', '10+10', '30+0'];
const boardSizes = ['7x6', '7x7', '8x8', '8x10', '10x10', '15x15'];
const modes = ['Classic', 'Square'];

function initializeGameList() {
    const numGames = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numGames; i++) {
        gameList.push(getRandomGame());
    }
}

function getRandomGame() {
    const gameName = ''; // You can add logic to generate a game name
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

        gameList.forEach(game => {
            htmlString += `
                <tr class="game-item">
                    <td>${game.player}</td>  
                    <td>${game.time}</td>  
                    <td>${game.boardSize}</td>  
                    <td>${game.mode}</td>
                </tr>
            `;
        });

        htmlString += '</tbody></table>';
        gameListDiv.innerHTML = htmlString;
    }
}

initializeGameList();
updateGameList();

setInterval(() => {
    addGame();
    const removeDelay = ((Math.random() * (8000 - 3000 + 1))) + 1234;
    setTimeout(removeGame, removeDelay);
}, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);
