import { FaRegularCircle, FaSolidX } from "solid-icons/fa";
import { Component, createSignal, For, Match, Switch } from "solid-js";
import { hasWon, Player, togglePlayer } from "../utils/player";
import FieldButton from "./fieldbutton";

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => Player.None)
  );
  const [turn, setTurn] = createSignal(Player.Circle);

  const handleClick = (id: number) => {
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
  };

  return (
    <div class="grid grid-cols-3 grid-rows-3">
      <For each={states()}>
        {(state, i) => (
          <FieldButton state={state} onClick={() => handleClick(i())} />
        )}
      </For>
    </div>
  );
};

export default Field;
