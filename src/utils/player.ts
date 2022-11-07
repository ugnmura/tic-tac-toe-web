export enum Player {
  None,
  Cross,
  Circle,
}

export const togglePlayer = (state: Player) => {
  switch (state) {
    case Player.Circle:
      return Player.Cross;
    case Player.Cross:
      return Player.Circle;
  }

  return Player.None;
};

export const hasWon = (states: Player[]) => {
  const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let w of winning) {
    const [a, b, c] = w;

    if (states[a] === Player.None) continue;
    if (states[a] === states[b] && states[a] == states[c]) {
      return states[a];
    }
  }

  return Player.None;
};
