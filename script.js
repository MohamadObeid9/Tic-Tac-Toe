function Cell() {
  let value = 0;
  const addValue = (player) => {
    value = player;
  };
  const getValue = () => value;

  return { addValue, getValue };
}

function GameBoard() {
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
  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );

    console.log(boardWithCellValues);
  };
  return { getBoard, printBoard };
}

function GameController() {
  const playerOne = prompt("the player who will play with X is :");
  const playerTwo = prompt("the player who will play with O is :");
  const board = GameBoard();
  const players = [
    { name: playerOne, value: "X" },
    { name: playerTwo, value: "O" },
  ];
  let activePlayer = players[0];
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const introductionMessage =
    "This is a tic-tac-toe game , you can played through the console , you can choose between the number availables (between 1 and 9) , each one of them indicate a cell in the board whith 1 represents the very top left one , and 9 represents the very bottom one on the right , and like that , hope you enjoyed it , and let the game begin";
  console.log(introductionMessage);

  const printNewBoard = () => {
    board.printBoard();
    console.log(
      `${getActivePlayer().name}'s turn (${getActivePlayer().value} turn) `
    );
  };
  const playRound = () => {
    const arr = [];
    for (let i = 0; i < 9; i++) {
      arr[i] = i;
    }
    for (let i = 0; i < arr.length; i++) {
      let numbersAvailable = "";
      arr.forEach((element, index) => {
        if ((index = arr.length - 1)) {
          numbersAvailable += element;
        } else {
          numbersAvailable += element + " , ";
        }
      });
      const numberChosen = Number(
        prompt(`choose a number between: ${numbersAvailable}`)
      );
      const index = arr.indexOf(numberChosen);
      if (index > -1) {
        arr.splice(index, 1);
      }
      console.log(`${getActivePlayer().name} choose ${numberChosen}`);
      switch (numberChosen) {
        case 1:
          arr[0][0] = getActivePlayer().value;
          break;
        case 2:
          arr[0][1] = getActivePlayer().value;
          break;
        case 3:
          arr[0][2] = getActivePlayer().value;
          break;
        case 4:
          arr[1][0] = getActivePlayer().value;
          break;
        case 5:
          arr[1][1] = getActivePlayer().value;
          break;
        case 6:
          arr[1][2] = getActivePlayer().value;
          break;
        case 7:
          arr[2][0] = getActivePlayer().value;
          break;
        case 8:
          arr[2][1] = getActivePlayer().value;
          break;
        case 9:
          arr[2][2] = getActivePlayer().value;
          break;
      }
      switchActivePlayer();
      printNewBoard();
    }
    printNewBoard();
};
return { playRound, getActivePlayer };
}

const game = GameController();
