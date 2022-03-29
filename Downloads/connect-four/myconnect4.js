/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for(let y = 0; y < HEIGHT; y++){
      board.push(Array.from({length: WIDTH}));
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');

  // TODO: add comment for this code
  // // code used to create a click area to add piece to a column
  let top = document.createElement("div");
    top.classList.add('piece');

  // for (let x = 0; x < WIDTH; x++) {
  //   const headCell = document.createElement("piece");
  //   headCell.classList.add('piece');
  //   headCell.setAttribute("id", x);
  //   headCell.addEventListener("click", handleClick);
  //   top.append(headCell);
  // }
 
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("div");
      cell.classList.add('piece');
      cell.setAttribute("id", `${y}-${x}`);
      htmlBoard.append(cell);
    }
  }
}


/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(col){
  // TODO: write the real version of this, rather than always returning 0
  for(let row = HEIGHT - 1; row>= 0; row--) {
    // checks if cell is empty. 
    if(!board[row][col]) {
      return row;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(col, row) {
  // TODO: make a div and insert into correct table cell
  // const piece = document.querySelector('div');
  // piece.classList.add('.player-one')
  // piece.style.top = -43 * (row+ 2);
  console.log(col, row);
  const circle = document.getElementById(`${row}-${col}`);
  if (currPlayer === 1){
    circle.classList.add('player-one');
  } else {
    circle.classList.add('player-two');
  }
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // if what you clicked on does not have "piece" class function ends.
  if(!evt.target.classList.contains("piece")){
    alert("You cannot Click there!");
  }
  // get x from ID of clicked cell
  console.log(evt.target.id);
  console.log(evt.target.id.split("-"));
  //converting it to a number
  let col = +evt.target.id.split("-")[1];
  console.log(col);

  // get next spot in column (if none, ignore click)
  const row = findSpotForCol(col);
  if (row === null) {
    return;
  }
  console.log(row);
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[row][col]= currPlayer;
  placeInTable(col, row);

   // check for win
   if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      } 
    }
  }
}
const boardDiv = document.getElementById('board');
boardDiv.addEventListener("click", handleClick);
makeBoard();
makeHtmlBoard();
