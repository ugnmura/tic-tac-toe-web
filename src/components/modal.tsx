import { Component, JSX } from "solid-js";

export interface ModalProps {
  children?: JSX.Element;
}

const Modal: Component<ModalProps> = (props) => {
  return (
    <div class="absolute inset-0 flex justify-center items-center">
      <div class="rounded bg-gray-100 px-8 py-5">{props.children}</div>
    </div>
  );
};

export default Modal;
