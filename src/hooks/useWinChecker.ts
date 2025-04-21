import { useMemo } from "react";
import { FieldState } from "../components/FieldButton";

export type GameResult = FieldState | "draw";

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const useWinChecker = (board: FieldState[]): GameResult => {
  return useMemo(() => {
    for (const [a, b, c] of WIN_PATTERNS) {
      if (
        board[a] !== "none" &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== "none")) {
      return "draw";
    }

    return "none";
  }, [board]);
};
