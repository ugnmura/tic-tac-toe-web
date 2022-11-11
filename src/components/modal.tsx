import { Component, JSX } from "solid-js";

export interface ModalProps {
  children?: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  return (
    <div class="animate-fadein animation-delay-1000 absolute inset-0 flex justify-center items-center transition bg-black/50">
      <div class="animate-spawn animation-delay-2000 rounded border-green border-8 bg-lavender px-8 py-5">{props.children}</div>
    </div>
  );
};

export default Modal;
