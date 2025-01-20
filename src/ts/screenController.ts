import { gameController } from "./gameController";

export const screenController = () => {
  const game = gameController();
  const playerTurnDiv = document.querySelector(".turn") as HTMLDivElement;
  const boardDiv = document.querySelector(".board") as HTMLDivElement;

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        // Anything clickable should be a button!!
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.column = columnIndex.toString();
        cellButton.dataset.row = rowIndex.toString();
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  // Add event listener for the board
  function clickHandlerBoard(e: Event) {
    const target = e.target as HTMLElement;
    const selectedColumn = target.dataset.column;
    const selectedRow = target.dataset.row;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn || !selectedRow) return;

    game.playRound(parseInt(selectedRow), parseInt(selectedColumn));
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
};
