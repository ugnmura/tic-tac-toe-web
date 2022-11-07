import { FaRegularCircle, FaSolidX } from "solid-icons/fa";
import { Component, Match, Switch } from "solid-js";
import { Player } from "../utils/player";

export interface FieldButtonProps {
  state: Player;
  onClick: () => void;
}

const FieldButton: Component<FieldButtonProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      class="bg-gray-300 rounded min-w-[8rem] min-h-[8rem] md:min-w-[12rem] md:min-h-[12rem] lg:min-w-[16rem] lg:min-h-[16rem] m-2 flex justify-center items-center"
    >
      <Switch fallback={<></>}>
        <Match when={props.state === Player.Cross}>
          <FaSolidX class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
        </Match>
        <Match when={props.state === Player.Circle}>
          <FaRegularCircle class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
        </Match>
      </Switch>
    </div>
  );
};

export default FieldButton;
