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

      cell.addEventListener("input", (e) => {
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
      const rowSet = new Set();
      const colSet = new Set();

      for (let j = 0; j < board[i].length; j++) {
        const rowValue = board[i][j];
        const colValue = board[j][i];

        if (rowValue === "" || colValue === "") {
          return false; // Empty cells are not valid
        }

        if (rowSet.has(rowValue) || colSet.has(colValue)) {
          return false; // Duplicate value found in row or column
        }

        rowSet.add(rowValue);
        colSet.add(colValue);
      }
    }

    return true;
  }

  function solveSudoku(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          for (let num = 1; num <= 5; num++) {
            if (
              !containsNumber(board[i], num) &&
              !containsNumber(board.map(r => r[j]), num)
            ) {
              board[i][j] = num;
              if (solveSudoku(board)) {
                return board;
              }
              board[i][j] = "";
            }
          }
          return null;
        }
      }
    }
    return board;
  }


  document.getElementById("solve-button").addEventListener("click", () => {
    let cells = document.querySelectorAll("td");
    let board = [...Array(5)].map(() => Array(5).fill(""));
  
    // Populate the board with initial values from the table
    for (let i = 0; i < cells.length; i++) {
      let row = Math.floor(i / 5);
      let col = i % 5;
      if (cells[i].textContent !== "") {
        board[row][col] = parseInt(cells[i].textContent);
      }
    }
  
    let solvedBoard = solveSudoku(board);
  
    if (!solvedBoard) {
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
