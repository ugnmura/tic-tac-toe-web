import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
  Switch,
} from "solid-js";
import { hasWon, Player, togglePlayer } from "../utils/player";
import FieldButton from "./fieldbutton";
import WinnerModal from "./winnermodal";

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => Player.None)
  );
  const [turn, setTurn] = createSignal(Player.Circle);
  const winner = createMemo(() => hasWon(states()));

  const handleClick = (id: number) => {
    let tmp = states();
    let t = turn();
    if (tmp[id] === Player.None) {
      tmp[id] = t;
      setState([...tmp]);

      t = togglePlayer(t);
      setTurn(t);
    }
  };

  const restartGame = () => {
    setState(Array.from({ length: 9 }, () => Player.None));
    setTurn(Player.Circle);
  };

  return (
    <div>
      <div class="grid grid-cols-3 grid-rows-3">
        <For each={states()}>
          {(state, i) => (
            <FieldButton state={state} onClick={() => handleClick(i())} />
          )}
        </For>
      </div>
      <Switch>
        <Match when={winner() === Player.Circle}>
          <WinnerModal restartGame={restartGame} winner="Circle" />
        </Match>
        <Match when={winner() === Player.Cross}>
          <WinnerModal restartGame={restartGame} winner="Cross" />
        </Match>
      </Switch>
    </div>
  );
};

export default Field;
