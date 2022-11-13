import {
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { hasWon, PlayerState, toggleButtonState } from "../utils/player";
import FieldButton from "./fieldbutton";
import ResultModal from "./resultmodal";
import { A, useLocation } from "@solidjs/router";
import Modal from "./modal";
import { gameExists, getGame, updateGameState } from "../utils/gameManager";

const Field: Component = () => {
  const [states, setState] = createSignal(
    Array.from({ length: 9 }, () => PlayerState.None)
  );
  const [turn, setTurn] = createSignal(PlayerState.Circle);

  const loc = useLocation();
  let gameID = loc.query.id;

  const [gameFound] = createResource(async () => {
    if (!gameID) {
      return false;
    }
    return await gameExists(gameID);
  });

  const gameNode = getGame(gameID);
  gameNode.get("field").on((data) => {
    const values = Object.values(data);
    const field = values.slice(0, values.length - 1) as PlayerState[];
    setState(field);
  });

  gameNode.get("turn").on((data) => {
    setTurn(data);
  });

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
    updateGameState(gameID, { field: states(), turn: turn() });
  };

  const [copied, setCopied] = createSignal(false);
  let copyTimeout: NodeJS.Timeout;

  return (
    <div>
      <Show when={!gameFound.loading && !gameFound()}>
        <Modal>
          <span>Could not find lobby</span>
          <A
            href="/"
            class="bg-terra mx-2 border-green border-2 px-4 py-2 rounded"
          >
            Back to Main Menu
          </A>
        </Modal>
      </Show>
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
      <div class="flex flex-row justify-center align-middle gap-x-3">
        <button
          onClick={() => {
            setCopied(true);
            if (copyTimeout) clearTimeout(copyTimeout);

            copyTimeout = setTimeout(() => {
              setCopied(false);
            }, 5 * 1000);

            navigator.clipboard.writeText(gameID);
          }}
          class="btn hover-shadow border-4 my-4 py-2 px-4"
        >
          {copied() ? "Game ID Copied!" : "Get Game ID"}
        </button>
        <A href="/" class="btn hover-shadow border-4 my-4 py-2 px-4">
          Leave Game
        </A>
      </div>
    </div>
  );
};

export default Field;
