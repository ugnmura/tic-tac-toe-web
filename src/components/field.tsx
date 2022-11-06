import { Component, For, Match, Switch } from "solid-js";
import { FaSolidX, FaRegularCircle } from "solid-icons/fa";

export enum ButtonState {
  None,
  Cross,
  Circle,
}

const Field: Component = () => {
  const states: ButtonState[] = Array.from(
    { length: 9 },
    () => ButtonState.None
  );

  return (
    <div class="grid grid-cols-3 grid-rows-3">
      <For each={states} fallback={<div>Loading...</div>}>
        {(item, _i) => (
          <div class="bg-gray-300 rounded min-w-[8rem] min-h-[8rem] md:min-w-[12rem] md:min-h-[12rem] lg:min-w-[16rem] lg:min-h-[16rem] m-2 flex justify-center items-center">
            <Switch fallback={<></>}>
              <Match when={item === ButtonState.Cross}>
                <FaSolidX class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
              </Match>
              <Match when={item === ButtonState.Circle}>
                <FaRegularCircle class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
              </Match>
            </Switch>
          </div>
        )}
      </For>
    </div>
  );
};

export default Field;
