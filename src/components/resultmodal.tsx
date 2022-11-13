import { Component } from "solid-js";
import Modal from "./modal";

export interface WinnerModalProps {
  result: string;
  restartGame: () => void;
}

const ResultModal: Component<WinnerModalProps> = (props) => {
  return (
    <Modal
      foregroundClass="animate-spawn animation-delay-2000"
      backgroundClass="animate-fadein animation-delay-1000"
    >
      <div class="flex flex-col">
        <h3 class="m-3 text-4xl text-center">{props.result}</h3>
        <button
          onClick={props.restartGame}
          class="py-2 px-3 rounded border-green border-2 bg-terra text-green m-auto cursor-pointer"
        >
          Restart Game
        </button>
      </div>
    </Modal>
  );
};

export default ResultModal;
