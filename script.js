function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    const selectedCell = board[row][column];
    if (selectedCell.getValue() !== 0) return;
    selectedCell.addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.table(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

function GameController(playerOneName = "X", playerTwoName = "O") {
  const board = Gameboard();

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
        checkBoard[i][2].getValue() !== 0
      )
        return true;
      if (
        checkBoard[0][i].getValue() === checkBoard[1][i].getValue() &&
        checkBoard[1][i].getValue() === checkBoard[2][i].getValue() &&
        checkBoard[2][i].getValue() !== 0
      )
        return true;
    }
    if (
      ((checkBoard[0][0].getValue() === checkBoard[1][1].getValue() &&
        checkBoard[1][1].getValue() === checkBoard[2][2].getValue()) ||
        (checkBoard[0][2].getValue() === checkBoard[1][1].getValue() &&
          checkBoard[1][1].getValue() === checkBoard[2][0].getValue())) &&
      checkBoard[1][1].getValue() !== 0
    )
      return true;
    return false;
  };

  const playRound = (row, column) => {
    console.log(
      `Dropping ${
        getActivePlayer().name
      }'s token into the cell [${row}][${column}]...`
    );
    board.dropToken(row, column, getActivePlayer().token);

    if (checkWin()) {
      printNewRound();
      console.log(`${getActivePlayer().name} WINS!`);
      console.log("please reload the screen to play again ")
    } else {
      switchPlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
