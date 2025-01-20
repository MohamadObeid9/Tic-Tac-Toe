import { cell } from "./cell";
export const gameboard = () => {
  type cell = {
    addToken: (player: string) => void;
    getValue: () => string;
  };

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
    const selectedcell = board[row][column];
    if (selectedcell.getValue() !== "") return;
    selectedcell.addToken(player);
  };

  const printBoard = () => {
    const boardWithcellValues: string[][] = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.table(boardWithcellValues);
  };

  return { getBoard, dropToken, printBoard };
};
