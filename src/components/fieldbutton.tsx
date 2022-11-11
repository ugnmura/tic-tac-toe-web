import { Component, Match, Switch } from "solid-js";
import { PlayerState } from "../utils/player";
import circle from "../svgs/circle.svg";
import cross from "../svgs/cross.svg";

export interface FieldButtonProps {
  state: PlayerState;
  onClick: () => void;
}

const FieldButton: Component<FieldButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      class="btn hover-shadow border-8 field flex justify-center items-center m-auto"
      aria-label="Tic Tac Toe Button"
    >
      <Switch fallback={<></>}>
        <Match when={props.state === PlayerState.Circle}>
          <img src={circle} alt="circle" class="animate-spawn" />
        </Match>
        <Match when={props.state === PlayerState.Cross}>
          <img src={cross} alt="cross" class="animate-spawn" />
        </Match>
      </Switch>
    </button>
  );
};

export default FieldButton;
