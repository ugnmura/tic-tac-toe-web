import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldState } from "@/components/FieldButton";

export type GameResult = FieldState | "draw" | "none";

const initialField = () =>
  Array.from({ length: 9 }, () => "none" as FieldState);

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

export const useFieldState = (autoResetDelay: number = 1000) => {
  const [field, setField] = useState<FieldState[]>(initialField);
  const [startingPlayer, setStartingPlayer] = useState<FieldState>("cross");
  const [currentPlayer, setCurrentPlayer] = useState<FieldState>("cross");
  const [score, setScore] = useState({
    circle: 0,
    cross: 0,
    draw: 0,
  });

  const result: GameResult = useMemo(() => {
    for (const [a, b, c] of WIN_PATTERNS) {
      if (
        field[a] !== "none" &&
        field[a] === field[b] &&
        field[b] === field[c]
      ) {
        return field[a];
      }
    }
    return field.every((cell) => cell !== "none") ? "draw" : "none";
  }, [field]);

  const setCell = useCallback(
    (index: number, value: FieldState) => {
      if (field[index] !== "none" || result !== "none") return;

      setField((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });

      setCurrentPlayer((prev) => (prev === "circle" ? "cross" : "circle"));
    },
    [field, result],
  );

  const reset = useCallback(() => {
    const nextStartingPlayer = startingPlayer === "circle" ? "cross" : "circle";
    setStartingPlayer(nextStartingPlayer);
    setCurrentPlayer(nextStartingPlayer);
    setField(initialField());
  }, [startingPlayer]);

  useEffect(() => {
    if (result !== "none") {
      if (result === "circle" || result === "cross") {
        setScore((s) => ({ ...s, [result]: s[result] + 1 }));
      } else {
        setScore((s) => ({ ...s, draw: s.draw + 1 }));
      }

      const timeout = setTimeout(() => {
        reset();
      }, autoResetDelay);

      return () => clearTimeout(timeout);
    }
  }, [result, autoResetDelay, reset]);

  return {
    currentPlayer,
    field,
    setCell,
    result,
    score,
  };
};
