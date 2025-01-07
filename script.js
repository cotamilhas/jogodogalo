let player1, player2;
let currentPlayer;
let board = Array(9).fill(null);
const symbols = ['X', 'O'];

// start the Game
function startGame() {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }

    player1 = { name: player1Name, symbol: 'X' };
    player2 = { name: player2Name, symbol: 'O' };
    currentPlayer = player1;

    document.getElementById('currentPlayer').textContent = `Current Player: ${currentPlayer.name}`;
    document.getElementById('gameBoard').style.visibility = 'visible';

    // Hide the input fields and start button
    document.querySelector('fieldset').style.display = 'none';

    document.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('clicked');
        cell.innerHTML = '';
        cell.addEventListener('click', handleCellClick);
    });
}

// handle Cell Click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell');

    if (board[cellIndex] !== null || cell.classList.contains('clicked')) {
        return; // ignore if the cell is already clicked
    }

    // update the cell and the board
    board[cellIndex] = currentPlayer.symbol;
    cell.innerHTML = currentPlayer.symbol;
    cell.classList.add('clicked');

    // check for winner or draw
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer.name} wins!`), 200);
        setTimeout(resetGame, 500);
    } else if (board.every(cell => cell !== null)) {
        setTimeout(() => alert("It's a draw!"), 200);
        setTimeout(resetGame, 500);
    } else {
        // switch player
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        document.getElementById('currentPlayer').textContent = `Current Player: ${currentPlayer.name}`;
    }
}

// check Winner
function checkWinner() {
    // check rows, columns, and diagonals for a winning condition
    for (let i = 0; i < 3; i++) {
        // check rows
        if (board[i * 3] === currentPlayer.symbol && board[i * 3 + 1] === currentPlayer.symbol && board[i * 3 + 2] === currentPlayer.symbol) {
            return true;
        }
        // check columns
        if (board[i] === currentPlayer.symbol && board[i + 3] === currentPlayer.symbol && board[i + 6] === currentPlayer.symbol) {
            return true;
        }
    }

    //  heck diagonals
    if (board[0] === currentPlayer.symbol && board[4] === currentPlayer.symbol && board[8] === currentPlayer.symbol) {
        return true;
    }
    if (board[2] === currentPlayer.symbol && board[4] === currentPlayer.symbol && board[6] === currentPlayer.symbol) {
        return true;
    }

    return false;
}

// reset the Game
function resetGame() {
    board = Array(9).fill(null);
    document.getElementById('gameBoard').style.visibility = 'hidden';
    document.getElementById('currentPlayer').textContent = '';
    document.querySelectorAll('td').forEach(cell => {
        cell.classList.remove('clicked');
        cell.innerHTML = '';
    });
    document.querySelector('fieldset').style.display = 'block';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
}
