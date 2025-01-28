import { cell } from "./cell";

/**
 * Represents a single cell in the game board.
 * @typedef {Object} cell
 * @property {Function} addToken - Adds a token to the cell for a given player.
 * @property {Function} getValue - Retrieves the current value of the cell.
 */
type cell = {
  addToken: (player: string) => void;
  getValue: () => string;
};

/**
 * Represents a Tic-Tac-Toe game board.
 *
 * @returns An object containing methods to interact with the game board.
 *
 * @function getBoard
 * @returns {cell[][]} The current state of the game board.
 *
 * @function dropToken
 * @param {number} row - The row index where the token should be placed.
 * @param {number} column - The column index where the token should be placed.
 * @param {string} player - The player token to be placed in the cell.
 *
 * @function printBoard
 * Prints the current state of the game board to the console.
 */
export const gameboard = () => {
  const rows = 3;
  const columns = 3;
  const board: cell[][] = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row: number, column: number, player: string) => {
    const selectedCell = board[row][column];
    if (selectedCell.getValue() !== "") return;
    selectedCell.addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues: string[][] = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.table(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
};
