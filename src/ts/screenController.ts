import { gameController } from "./gameController";

/**
 * Initializes the screen controller for the Tic-Tac-Toe game.
 * This function sets up the game board and player turn display,
 * and handles user interactions with the game board.
 *
 * @remarks
 * The screen controller is responsible for rendering the game board,
 * updating the display based on the game state, and handling user
 * clicks on the board to play rounds.
 *
 * @example
 * ```typescript
 * import { screenController } from './screenController';
 * screenController();
 * ```
 *
 * @returns {void} This function does not return anything.
 */
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
        cellButton.classList.add(
          "flex",
          "justify-center",
          "items-center",
          "text-center",
          "text-3xl",
          "border",
          "border-gray-400",
          "bg-yellow-300"
        );
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
