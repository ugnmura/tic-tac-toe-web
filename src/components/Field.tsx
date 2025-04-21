"use client";
import React from "react";
import FieldButton, { FieldState } from "./FieldButton";

interface FieldProps {
  states: FieldState[];
  onClick: (index: number) => void;
}

const Field: React.FC<FieldProps> = ({ states, onClick }) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 aspect-square max-w-[75vw] max-h-[75vh] mx-auto">
      {states.map((state, i) => (
        <FieldButton
          key={i}
          active={true}
          state={state}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
};

export default Field;
