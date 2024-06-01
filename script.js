const board = document.getElementById('board');
const message = document.getElementById('message');
let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }

    if (!cells.includes('')) {
        return 'draw';
    }

    return null;
}

function botMove() {
    for (let i = 0; i < 9; i++) {
        if (!cells[i]) {
            cells[i] = currentPlayer;
            if (checkWinner() === currentPlayer) {
                cells[i] = '';
                return i;
            }
            cells[i] = '';
        }
    }

    const opponent = currentPlayer === 'X' ? 'O' : 'X';
    for (let i = 0; i < 9; i++) {
        if (!cells[i]) {
            cells[i] = opponent;
            if (checkWinner() === opponent) {
                cells[i] = '';
                return i;
            }
            cells[i] = '';
        }
    }

    if (!cells[4]) {
        return 4;
    }

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(index => !cells[index]);
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(index => !cells[index]);
    return availableEdges[Math.floor(Math.random() * availableEdges.length)];
}

function handleClick(index) {
    if (!gameEnded && !cells[index]) {
        cells[index] = currentPlayer;
        render();
        const winner = checkWinner();
        if (winner) {
            gameEnded = true;
            if (winner === 'draw') {
                message.textContent = 'ไอ้กระจอกเอาชนะแค่aiแค่นี้ก็ไม่ได้!';
            } else {
                message.textContent = `ไอ้${winner} อย่าแอค!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(() => {
                    const index = botMove();
                    cells[index] = currentPlayer;
                    render();
                    const winner = checkWinner();
                    if (winner) {
                        gameEnded = true;
                        if (winner === 'draw') {
                            message.textContent = 'ไอ้กระจอกเอาชนะแค่aiแค่นี้ก็ไม่ได้!';
                        } else {
                            message.textContent = `ไอ้${winner} อย่าแอค!`;
                        }
                    }
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }, 1000);
            }
        }
    }
}

function render() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleClick(index));
        board.appendChild(cellElement);
    });
}

function restartGame() {
    currentPlayer = 'X';
    cells = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    message.textContent = '';
    render();
}

render();
