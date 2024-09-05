document.addEventListener('DOMContentLoaded', createGrid);

function createGrid() {
    const grid = document.getElementById('sudoku-grid');
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '9';
        grid.appendChild(input);
    }
}

function solveSudoku() {
    const grid = document.querySelectorAll('#sudoku-grid input');
    const board = [];

    grid.forEach((input, index) => {
        const value = input.value ? parseInt(input.value) : 0;
        const rowIndex = Math.floor(index / 9);
        if (!board[rowIndex]) {
            board[rowIndex] = [];
        }
        board[rowIndex].push(value);
    });

    if (solve(board)) {
        grid.forEach((input, index) => {
            const rowIndex = Math.floor(index / 9);
            const colIndex = index % 9;
            input.value = board[rowIndex][colIndex];
        });
    } else {
        alert('No solution exists!');
    }
}

function clearGrid() {
    const grid = document.querySelectorAll('#sudoku-grid input');
    grid.forEach(input => input.value = '');
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solve(board) {
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty) {
            break;
        }
    }

    if (isEmpty) {
        return true;
    }

    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }
    return false;
}
