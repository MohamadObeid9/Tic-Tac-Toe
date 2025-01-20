export const createPara = () => {
  type Cell = {
    addToken: (player: string) => void;
    getValue: () => string;
  };

  function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
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
  }

  function Cell() {
    let value = "";

    const addToken = (player: string) => {
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
  }

  function ScreenController() {
    const game = GameController();
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
  }

  ScreenController();
};
