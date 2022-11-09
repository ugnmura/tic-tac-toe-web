export enum PlayerState {
  None,
  Cross,
  Circle,
  Draw,
}

export const toggleButtonState = (state: PlayerState) => {
  switch (state) {
    case PlayerState.Circle:
      return PlayerState.Cross;
    case PlayerState.Cross:
      return PlayerState.Circle;
  }

  return PlayerState.None;
};

export const hasWon = (states: PlayerState[]) => {
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

    if (states[a] === PlayerState.None) continue;
    if (states[a] === states[b] && states[a] == states[c]) {
      return states[a];
    }
  }

  let draw = true;
  for (let s of states) {
    if (s === PlayerState.None) {
      draw = false;
    }
  }

  if (draw) {
    return PlayerState.Draw;
  }

  return PlayerState.None;
};
