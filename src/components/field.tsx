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
import { useLocation, useNavigate } from "@solidjs/router";
import { v4 } from "uuid";
import GUN from "gun";

const gun = GUN("https://mvp-gun.herokuapp.com/gun");

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => PlayerState.None)
  );
  const [turn, setTurn] = createSignal(PlayerState.Circle);
  let myTurn = PlayerState.None;

  const winner = createMemo(() => {
    const result = hasWon(states());
    if (result !== PlayerState.None) {
      myTurn = PlayerState.None;
    }
    return result;
  });

  const handleClick = (id: number) => {
    let tmp = states();
    let t = turn();

    if (myTurn === PlayerState.None) myTurn = t;

    if (t !== myTurn) return;
    if (tmp[id] !== PlayerState.None) return;

    tmp[id] = t;
    setState([...tmp]);

    t = toggleButtonState(t);
    setTurn(t);

    sendState();
  };

  const restartGame = () => {
    setState(Array.from({ length: 9 }, () => PlayerState.None));
    setTurn(PlayerState.Circle);
    myTurn = PlayerState.None;

    sendState();
  };

  const sendState = () => {
    gameNode.put({
      field: { ...states() },
      turn: turn(),
    });
  };

  const loc = useLocation();
  let gameID = loc.query.id;
  if (!gameID) {
    gameID = v4();
    const pathname = loc.pathname;
    const navigate = useNavigate();
    navigate(`${pathname}?id=${gameID}`, { replace: true });
  }
  const gameNode = gun.get(gameID);

  gameNode.get("field").on((data) => {
    const values = Object.values(data);
    const field = values.slice(0, values.length - 1) as PlayerState[];
    setState(field);
  });

  gameNode.get("turn").on((data) => {
    setTurn(data);
  });

  const [copied, setCopied] = createSignal(false);
  let copyTimeout: NodeJS.Timeout;

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
      <div class="flex justify-center align-middle m-auto">
        <button
          onClick={() => {
            setCopied(true);
            if (copyTimeout) clearTimeout(copyTimeout);

            copyTimeout = setTimeout(() => {
              setCopied(false);
            }, 5 * 1000);

            navigator.clipboard.writeText(window.location.href);
          }}
          class="btn border-4 my-4 py-2 px-4"
        >
          {copied() ? "Link Copied!" : "Get Link"}
        </button>
      </div>
    </div>
  );
};

export default Field;
