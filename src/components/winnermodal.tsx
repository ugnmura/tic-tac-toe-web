import { Component } from "solid-js";
import Modal from "./modal";

export interface WinnerModalProps {
  winner: string;
  restartGame: () => void;
}

const WinnerModal: Component<WinnerModalProps> = (props) => {
  return (
    <Modal>
      <div class="flex flex-col">
        <h3 class="m-3 text-4xl text-center">Winner: {props.winner}</h3>
        <span onClick={props.restartGame} class="py-2 px-3 rounded bg-gray-300 m-auto cursor-pointer">Restart Game</span>
      </div>
    </Modal>
  );
};

export default WinnerModal;
