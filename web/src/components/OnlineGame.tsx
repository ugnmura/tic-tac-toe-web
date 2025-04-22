import { useOnlineFieldState } from "@/lib/hooks/useOnlineFieldState";
import Field from "./Field";
import Scoreboard from "./Scoreboard";

export interface OnlineGameProps {
  id: string;
}

const OnlineGame = ({ id }: OnlineGameProps) => {
  const { field, setCell, result, score } = useOnlineFieldState(id);

  return (
    <div className="space-y-8">
      <Field states={field} onClick={setCell} result={result} />
      <Scoreboard
        xLabel="Player 1"
        oLabel="Player 2"
        xScore={score.cross}
        oScore={score.circle}
        tieScore={score.draw}
      />
    </div>
  );
};

export default OnlineGame;
