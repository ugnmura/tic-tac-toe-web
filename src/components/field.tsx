import {
  Component,
  createMemo,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
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

  const keydownEvent = (e: KeyboardEvent) => {
    if (e.code.startsWith("Digit")) {
      const num = parseInt(e.code.charAt(e.code.length - 1)) - 1;
      if (num >= 0) {
        handleClick(num);
      }
    } else if (e.code.startsWith("Numpad")) {
      let num = parseInt(e.code.charAt(e.code.length - 1));
      if (num >= 7 && num <= 9) num -= 6;
      if (num >= 1 && num <= 3) num += 6;
      num -= 1;
      if (num >= 0) {
        handleClick(num);
      }
    }
  };

  onMount(() => {
    window.addEventListener("keydown", keydownEvent);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", keydownEvent);
  });

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
  const pathname = loc.pathname;
  let gameID = loc.query.id;
  if (!gameID) {
    gameID = v4();
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
      <form
        action="/"
        method="get"
        class="flex justify-between items-center rounded bg-lavender border-green border-4 px-4 py-2 m-4"
      >
        <span>
          <label for="gameid-input" class="px-2">
            Join Game ID
          </label>
          <input
            id="gameid-input"
            type="text"
            class="px-2 rounded border-green border-2 w-[max(80vw, 20rem)]"
          />
        </span>
        <button
          onClick={(e) => {
            const input = document.getElementById(
              "gameid-input"
            ) as HTMLInputElement;
            if (input.value) {
              document.location.href = `${pathname}?id=${input.value}`;
            }

            e.preventDefault();
          }}
          class="bg-terra mx-2 border-green border-2 px-3 py-1 rounded"
        >
          Join
        </button>
      </form>
      <div class="grid grid-cols-3 grid-rows-3 gap-4 aspect-square">
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
      <div class="flex flex-col justify-center align-middle">
        <button
          onClick={() => {
            setCopied(true);
            if (copyTimeout) clearTimeout(copyTimeout);

            copyTimeout = setTimeout(() => {
              setCopied(false);
            }, 5 * 1000);

            navigator.clipboard.writeText(gameID);
          }}
          class="btn hover-shadow border-4 my-4 py-2 px-4 m-auto"
        >
          {copied() ? "Game ID Copied!" : "Get Game ID"}
        </button>
      </div>
    </div>
  );
};

export default Field;
