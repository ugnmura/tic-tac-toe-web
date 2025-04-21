"use client";
import React from "react";
import Image from "next/image";

export type FieldState = "none" | "circle" | "cross";

interface FieldButtonProps {
  state: FieldState;
  onClick: () => void;
  active: boolean;
}

const FieldButton: React.FC<FieldButtonProps> = ({
  state,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className="btn border-8 min-w-[25vh] min-h-[25vh] aspect-square"
      aria-label="Tic Tac Toe Button"
      tabIndex={active ? 0 : -1}
    >
      {state === "circle" && (
        <div className="relative w-full h-full animate-spawn">
          <Image fill src="/circle.svg" alt="circle" className="object-cover" />
        </div>
      )}
      {state === "cross" && (
        <div className="relative w-full h-full animate-spawn">
          <Image fill src="/cross.svg" alt="cross" className="object-cover" />
        </div>
      )}
    </button>
  );
};

export default FieldButton;
