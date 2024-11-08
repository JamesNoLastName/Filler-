let board = [];  

function createGameGrid(rows, cols) {
    const gameBoard = document.getElementById('gameBoard');
    const colorButtonsContainer = document.getElementById('colorButtons');
    gameBoard.innerHTML = '';
    colorButtonsContainer.innerHTML = '';

    const cellSize = 5;
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const boardWidth = cols * cellSize;
    const boardHeight = rows * cellSize;

    gameBoard.style.width = `${boardWidth}vh`;
    gameBoard.style.height = `${boardHeight}vh`;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board[i][j] = cell; 
            gameBoard.appendChild(cell);
        }
    }

    const colors = ['red', 'blue', 'yellow', 'green', 'black', 'magenta'];

    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function setSquareColor(i, j) {
        let newColor;
        let same = true;

        while (same) {
            newColor = getRandomColor();
            same = checkAdjacentColor(i, j, newColor);
        }

        board[i][j].style.backgroundColor = newColor;
    }

    function checkAdjacentColor(i, j, color) {
        console.log(`Checking cell at [${i}, ${j}] with color ${color}`);
        if (!board[i] || !board[i][j]) {
            console.error(`Cell at [${i}, ${j}] is undefined!`);
            return false; 
        }
        return (
            (i > 0 && board[i - 1][j].style.backgroundColor === color) ||
            (i < rows - 1 && board[i + 1][j].style.backgroundColor === color) ||
            (j > 0 && board[i][j - 1].style.backgroundColor === color) ||
            (j < cols - 1 && board[i][j + 1].style.backgroundColor === color)
        );
    }

    function fillBoardWithColors() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                setSquareColor(i, j);
            }
        }
    }

    fillBoardWithColors();
    colors.forEach(color => {
        const button = document.createElement('div');
        button.classList.add('color-button', color);
        button.id = color;
        colorButtonsContainer.appendChild(button);
    });
    initializeLogic(board);
}
