window.addEventListener("DOMContentLoaded", () => {
  let cells = document.querySelectorAll("td");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.setAttribute("contentEditable", "true");
      cells.forEach((c) => {
        if (c !== cell) {
          c.setAttribute("contentEditable", "false");
        }
      });
    });

    cell.addEventListener("keypress", (e) => {
      let key = String.fromCharCode(e.which);
      if (!/[1-5]/.test(key)) {
        e.preventDefault();
      }
    });

    cell.addEventListener("blur", () => {
      let value = parseInt(cell.textContent);
      if (value < 1 || value > 5 || isNaN(value)) {
        cell.textContent = "";
      }
    });
  });
});

function containsNumber(array, number) {
  return array.includes(parseInt(number));
}

function isValidSudoku(board) {
  for (let i = 0; i < board.length; i++) {
    let row = board[i];
    for (let j = 0; j < row.length; j++) {
      let cellValue = row[j];
      if (cellValue !== "") {
        if (containsNumber(row, cellValue) || containsNumber(board.map(r => r[j]), cellValue)) {
          return false;
        }
      }
    }
  }
  return true;
}

function solveSudoku(board) {
  let emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length === 0) {
    return board;
  }

  for (let [row, col] of emptyCells) {
    for (let num = 1; num <= 5; num++) {
      if (!containsNumber(board[row], num) && !containsNumber(board.map(r => r[col]), num)) {
        let solvedBoard = JSON.parse(JSON.stringify(board));
        solvedBoard[row][col] = num;
        let result = solveSudoku(solvedBoard);
        if (result !== null) {
          return result;
        }
      }
    }
  }
  return null;
}

document.getElementById("solve-button").addEventListener("click", () => {
  let cells = document.querySelectorAll("td");
  let board = [...Array(5)].map(() => Array(5));
  for (let i = 0; i < cells.length; i++) {
    let row = Math.floor(i / 5);
    let col = i % 5;
    board[row][col] = cells[i].textContent;
  }

  let solvedBoard = solveSudoku(board);

  if (solvedBoard === null) {
    alert("No valid solution found.");
    return;
  }

  let resultTable = document.createElement("table");
  for (let i = 0; i < solvedBoard.length; i++) {
    let resultRow = document.createElement("tr");
    for (let j = 0; j < solvedBoard[i].length; j++) {
      let resultCell = document.createElement("td");
      resultCell.textContent = solvedBoard[i][j];
      resultRow.appendChild(resultCell);
    }
    resultTable.appendChild(resultRow);
  }

  document.querySelector(".container").appendChild(resultTable);
});
