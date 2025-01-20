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
