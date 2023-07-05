export type Player = "X" | "O" | "";
export type Board = Player[][];

export function createNewBoard(): Board {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

export function getNextPlayer(board: Board) {
  const flattenedBoard = board.flat();
  const xCount = flattenedBoard.filter((cell) => cell === "X").length;
  const oCount = flattenedBoard.filter((cell) => cell === "O").length;

  return xCount === oCount ? "X" : "O";
}

export function hasWinner(board: Board): Player | null {
  // Check rows
  for (const row of board) {
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== "") {
      return row[0];
    }
  }

  // Check columns
  for (let x = 0; x < 3; x++) {
    if (
      board[0][x] === board[1][x] &&
      board[1][x] === board[2][x] &&
      board[0][x] !== ""
    ) {
      return board[0][x];
    }
  }

  // Check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    return board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    return board[0][2];
  }
  return null;
}
