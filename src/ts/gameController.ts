import { gameboard } from "./gameBoard";

/**
 * Creates a game controller for a Tic-Tac-Toe game.
 *
 * @param {string} [playerOneName="X"] - The name of the first player.
 * @param {string} [playerTwoName="O"] - The name of the second player.
 * @returns {object} The game controller object with methods to play a round, get the active player, get the board, and check for a win.
 *
 * @property {function} playRound - Plays a round by placing the active player's token on the board at the specified row and column.
 * @property {function} getActivePlayer - Returns the active player object.
 * @property {function} getBoard - Returns the current state of the game board.
 * @property {function} checkWin - Checks if there is a winning condition on the board.
 */
export const gameController = (playerOneName = "X", playerTwoName = "O") => {
  const board = gameboard();

  const players = [
    {
      name: playerOneName,
      token: "X",
    },
    {
      name: playerTwoName,
      token: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const checkWin = () => {
    const checkBoard = board.getBoard();
    for (let i = 0; i < 3; i++) {
      if (
        checkBoard[i][0].getValue() === checkBoard[i][1].getValue() &&
        checkBoard[i][1].getValue() === checkBoard[i][2].getValue() &&
        checkBoard[i][2].getValue() !== ""
      )
        return true;
      if (
        checkBoard[0][i].getValue() === checkBoard[1][i].getValue() &&
        checkBoard[1][i].getValue() === checkBoard[2][i].getValue() &&
        checkBoard[2][i].getValue() !== ""
      )
        return true;
    }
    if (
      ((checkBoard[0][0].getValue() === checkBoard[1][1].getValue() &&
        checkBoard[1][1].getValue() === checkBoard[2][2].getValue()) ||
        (checkBoard[0][2].getValue() === checkBoard[1][1].getValue() &&
          checkBoard[1][1].getValue() === checkBoard[2][0].getValue())) &&
      checkBoard[1][1].getValue() !== ""
    )
      return true;
    return false;
  };

  const playRound = (row: number, column: number) => {
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into the cell [${row}][${column}]...`
    );
    board.dropToken(row, column, getActivePlayer().token);

    if (checkWin()) {
      printNewRound();
      console.log(`${getActivePlayer().name} WINS!`);
      console.log("please reload the screen to play again ");
      alert(`${activePlayer.name} is the WINNER!!`);
      location.reload(); //reload the screen after announcement the winner
    } else {
      switchPlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    checkWin,
  };
};
