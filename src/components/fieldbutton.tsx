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
      class="bg-gray-300 rounded min-w-[6rem] min-h-[6rem] sm:min-w-[8rem] sm:min-h-[8rem] md:min-w-[12rem] md:min-h-[12rem] lg:min-w-[16rem] lg:min-h-[16rem] m-2 flex justify-center items-center"
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
