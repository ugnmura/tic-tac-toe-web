"use client";
import React from "react";
import FieldButton, { FieldState } from "@/components/FieldButton";
import { GameResult } from "@/lib/hooks/useFieldState";

interface FieldProps {
  states: FieldState[];
  result: GameResult;
  onClick: (index: number) => void;
}

const Field: React.FC<FieldProps> = ({ states, onClick }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 min-w-[75vmin] min-h-[75vmin] aspect-square">
      {states.map((state, i) => (
        <FieldButton key={i} state={state} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Field;
