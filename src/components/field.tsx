import { FaRegularCircle, FaSolidX } from "solid-icons/fa";
import { Component, createSignal, For, Match, Switch } from "solid-js";
import { hasWon, Player, togglePlayer } from "../utils/player";

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => Player.None)
  );
  const [turn, setTurn] = createSignal(Player.Circle);

  return (
    <div class="grid grid-cols-3 grid-rows-3">
      <For each={states()}>
        {(state, i) => {
          const id = i();
          return (
            <div
              onClick={() => {
                let tmp = states();
                let t = turn();
                if (tmp[id] === Player.None) {
                  tmp[id] = t;
                  setState([...tmp]);

                  t = togglePlayer(t);
                  setTurn(t);

                  const playerWon = hasWon(states());
                  if (playerWon !== Player.None) {
                    switch (playerWon) {
                      case Player.Cross:
                        console.log("Cross");
                        break;
                      case Player.Circle:
                        console.log("Circle");
                        break;
                    }
                  }
                }
              }}
              class="bg-gray-300 rounded min-w-[8rem] min-h-[8rem] md:min-w-[12rem] md:min-h-[12rem] lg:min-w-[16rem] lg:min-h-[16rem] m-2 flex justify-center items-center"
            >
              <Switch fallback={<></>}>
                <Match when={state === Player.Cross}>
                  <FaSolidX class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
                </Match>
                <Match when={state === Player.Circle}>
                  <FaRegularCircle class="text-[6rem] md:text-[8rem] lg:text-[12rem]" />
                </Match>
              </Switch>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default Field;
