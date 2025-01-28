/**
 * Represents a cell in a Tic-Tac-Toe game.
 *
 * @returns An object with methods to add a token to the cell and get the current value of the cell.
 */
export const cell = () => {
  let value = "";

  const addToken = (player: string) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
};
