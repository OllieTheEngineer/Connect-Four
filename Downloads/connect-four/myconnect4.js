/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const currPlayer = 1; // active player: 1 or 2
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

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y>= 0; y--) {
    // checks if cell is empty. 
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.querySelector('div');
  piece.classList.add('.player-one')
  piece.style.top = -43 * (y+ 2);

  const circle = document.getElementById(`${y} - ${x}`);
  piece.append(circle);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert("Game Over!")
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // if what you clicked on does not have "piece" class function ends.
  if(!evt.target.classList.contains("piece")){
    return;
  }
  // get x from ID of clicked cell
  console.log(evt.target.id);
  console.log(evt.target.id.split("-"));
  //converting it to a number
  let x = +evt.target.id.split("-")[1];
  console.log(x);

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  console.log(y);
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[x]= currPlayer;
  placeInTable(y, x);
  

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
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
