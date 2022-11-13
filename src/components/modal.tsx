import { Component, JSX } from "solid-js";

export interface ModalProps {
  children?: JSX.Element;
  cancel?: () => void;
  backgroundClass?: string;
  foregroundClass?: string;
}

const Modal: Component<ModalProps> = (props) => {
  return (
    <div
      class={`${
        props.backgroundClass ? props.backgroundClass : ""
      } absolute inset-0 flex justify-center items-center bg-black/50`}
      onClick={props.cancel}
    >
      <div
        class={`${
          props.foregroundClass ? props.foregroundClass : ""
        } rounded border-green border-8 bg-lavender px-8 py-5`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
