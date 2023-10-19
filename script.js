  window.addEventListener("DOMContentLoaded", () => {     //Basically changes the element inside the cell if it is clicked and only allows 1-5 values
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

  function containsNumber(array, number) {                //This function allows checking of both row and column
    return array.includes(parseInt(number));
  }

  function solveSudoku(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {                         //Check if the current cell is empty. Empty == needs value
          for (let num = 1; num <= 5; num++) {
            if (
              !containsNumber(board[i], num) &&           //Check if num is not in the row of the empty
              !containsNumber(board.map(r => r[j]), num)  //Check if num is not in the column of the empty
            ) {
              board[i][j] = num;
              if (solveSudoku(board)) {                   //It uses recursion to solve the remaining empty cells
                return board;                             //Backtrack by resetting the cell to an empty state only if the recursive call returns null
              }
              board[i][j] = "";
            }
          }
          return null;                                    //returns null if the cell already has a value inside
        }
      }
    }
    return board;                                         //returns the board
  }


  document.getElementById("solve-button").addEventListener("click", () => { //basically calls the function when the button is clicked
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
