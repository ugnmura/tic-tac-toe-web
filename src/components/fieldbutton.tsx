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
    <div
      onClick={props.onClick}
      class="rounded bg-lavender border-green border-8 field m-2 flex justify-center items-center"
    >
      <Switch fallback={<></>}>
        <Match when={props.state === PlayerState.Cross}>
          <img src={cross} alt="cross" />
        </Match>
        <Match when={props.state === PlayerState.Circle}>
          <img src={circle} alt="circle" />
        </Match>
      </Switch>
    </div>
  );
};

export default FieldButton;
