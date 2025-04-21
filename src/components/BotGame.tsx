"use client";
import { useEffect, useState } from "react";
import Field from "./Field";
import { FieldState } from "./FieldButton";

const BotGame = () => {
  const [states, setStates] = useState<FieldState[]>(
    Array.from({ length: 9 }, () => "none"),
  );

  const [currentPlayer, setCurrentPlayer] = useState<FieldState>("circle");

  const playerIs = "circle";
  const botIs = "cross";

  const handleClick = (index: number) => {
    if (currentPlayer !== playerIs || states[index] !== "none") return;

    const newStates = [...states];
    newStates[index] = playerIs;
    setStates(newStates);
    setCurrentPlayer(botIs);
  };

  useEffect(() => {
    if (currentPlayer !== botIs) return;

    const emptyIndexes = states
      .map((s, i) => (s === "none" ? i : null))
      .filter((i): i is number => i !== null);

    if (emptyIndexes.length === 0) return;

    const randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    const timeout = setTimeout(() => {
      const newStates = [...states];
      newStates[randomIndex] = botIs;
      setStates(newStates);
      setCurrentPlayer(playerIs);
    }, 500); // bot "thinking" delay

    return () => clearTimeout(timeout);
  }, [currentPlayer, states]);

  return (
    <div className="min-h-screen grid place-content-center px-4">
      <Field states={states} onClick={handleClick} />
    </div>
  );
};

export default BotGame;
