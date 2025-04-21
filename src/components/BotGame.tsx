"use client";
import { useEffect } from "react";
import Field from "./Field";
import { FieldState } from "./FieldButton";
import { useFieldState } from "@/hooks/useFieldState";
import Scoreboard from "./Scoreboard";
import Link from "next/link";

const BotGame = () => {
  const { field, setCell, result, score, currentPlayer } = useFieldState();

  const playerIs = "cross";
  const botIs = "circle";

  const handleClick = (index: number) => {
    if (currentPlayer !== playerIs) return;

    setCell(index, playerIs);
  };

  useEffect(() => {
    if (currentPlayer !== botIs) return;

    const emptyIndexes = field
      .map((s, i) => (s === "none" ? i : null))
      .filter((i): i is number => i !== null);

    if (emptyIndexes.length === 0) return;

    const findWinningMove = (who: FieldState): number | null => {
      for (const [a, b, c] of [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
      ]) {
        const line = [field[a], field[b], field[c]];
        const indexes = [a, b, c];
        const count = line.filter(cell => cell === who).length;
        const empty = line.indexOf("none");
        if (count === 2 && empty !== -1) return indexes[empty];
      }
      return null;
    };

    const winningMove = findWinningMove(botIs);
    const blockMove = findWinningMove(playerIs);

    const move =
      winningMove ?? blockMove ??
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const timeout = setTimeout(() => {
      setCell(move, botIs);
    }, 500); // bot "thinking" delay

    return () => clearTimeout(timeout);
  }, [currentPlayer, field]);

  return (
    <div className="space-y-8">
      <Field states={field} onClick={handleClick} result={result} />
      <Scoreboard xLabel="Player" oLabel="Bot" xScore={score.cross} oScore={score.circle} tieScore={score.draw} />
    </div>
  );
};

export default BotGame;
