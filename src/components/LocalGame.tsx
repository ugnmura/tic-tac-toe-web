"use client";
import Field from "./Field";
import { useFieldState } from "@/hooks/useFieldState";
import Scoreboard from "./Scoreboard";

const LocalGame = () => {
  const { field, setCell, result, score, currentPlayer } = useFieldState();

  const handleClick = (index: number) => {
    setCell(index, currentPlayer);
  };

  return (
    <div className="space-y-8">
      <Field states={field} onClick={handleClick} result={result} />
      <Scoreboard xLabel="Player 1" oLabel="Player 2" xScore={score.cross} oScore={score.circle} tieScore={score.draw} />
    </div>
  );
};

export default LocalGame;
