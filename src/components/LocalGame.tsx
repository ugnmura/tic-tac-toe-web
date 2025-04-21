"use client";
import { useState } from "react";
import Field from "./Field";
import { FieldState } from "./FieldButton";

const LocalGame = () => {
  const [states, setStates] = useState<FieldState[]>(
    Array.from({ length: 9 }, () => "none"),
  );

  const [currentPlayer, setCurrentPlayer] = useState<FieldState>("circle");

  const handleClick = (index: number) => {
    setStates((prevStates) => {
      if (prevStates[index] !== "none") return prevStates;

      const newStates = [...prevStates];
      newStates[index] = currentPlayer;

      setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

      return newStates;
    });
  };

  return (
    <div className="min-h-screen grid place-content-center px-4">
      <Field states={states} onClick={handleClick} />
    </div>
  );
};

export default LocalGame;
