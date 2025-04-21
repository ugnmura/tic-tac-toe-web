import React from "react";
import Image from "next/image";

interface ScoreboardProps {
  xLabel: string;
  oLabel: string;
  xScore: number;
  oScore: number;
  tieScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({
  xLabel,
  oLabel,
  xScore,
  oScore,
  tieScore,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center text-base-content border-base-300 border-2 p-4 rounded-xl shadow-md w-full">
      <div className="space-y-1">
        <div className="text-sm font-medium uppercase flex place-items-center justify-center gap-1">
          <Image alt="X" src="/cross.svg" width={32} height={32} />
          {xLabel}
        </div>
        <div className="text-3xl font-bold">{xScore}</div>
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium uppercase">Tie</div>
        <div className="text-3xl font-bold">{tieScore}</div>
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium uppercase flex items-center justify-center gap-1">
          <Image alt="O" src="/circle.svg" width={32} height={32} />
          {oLabel}
        </div>
        <div className="text-3xl font-bold">{oScore}</div>
      </div>
    </div>
  );
};

export default Scoreboard;
