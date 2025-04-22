"use client";
import React from "react";
import Image from "next/image";

export type FieldState = "none" | "circle" | "cross";

interface FieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: FieldState;
}

const FieldButton: React.FC<FieldButtonProps> = ({
  state,
  ...props
}) => {
  return (
    <button
      {...props}
      className="btn border-base-300 border-8 size-full aspect-square shadow-xl"
      aria-label="Field Button"
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
