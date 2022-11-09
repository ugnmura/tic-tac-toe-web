import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
  Switch,
} from "solid-js";
import { hasWon, PlayerState, toggleButtonState } from "../utils/player";
import FieldButton from "./fieldbutton";
import ResultModal from "./resultmodal";

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => PlayerState.None)
  );
  const [turn, setTurn] = createSignal(PlayerState.Circle);
  const winner = createMemo(() => hasWon(states()));

  const handleClick = (id: number) => {
    let tmp = states();
    let t = turn();
    if (tmp[id] === PlayerState.None) {
      tmp[id] = t;
      setState([...tmp]);

      t = toggleButtonState(t);
      setTurn(t);
    }
  };

  const restartGame = () => {
    setState(Array.from({ length: 9 }, () => PlayerState.None));
    setTurn(PlayerState.Circle);
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
        <Match when={winner() === PlayerState.Circle}>
          <ResultModal restartGame={restartGame} result="Winner: Circle" />
        </Match>
        <Match when={winner() === PlayerState.Cross}>
          <ResultModal restartGame={restartGame} result="Winner: Cross" />
        </Match>
        <Match when={winner() === PlayerState.Draw}>
          <ResultModal restartGame={restartGame} result="Draw" />
        </Match>
      </Switch>
    </div>
  );
};

export default Field;
