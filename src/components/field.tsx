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
  const winner = createMemo(() => hasWon(states()));
  let myTurn = PlayerState.None;

  const handleClick = (id: number) => {
    let tmp = states();
    let t = turn();

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

    sendState();
  };

  const sendState = () => {
    gameNode.put({
      field: { ...states() },
      turn: turn(),
    });
  };

  const getPlayer = () => {
    let playerID = localStorage.getItem("playerID");
    if (!playerID) {
      playerID = v4();
      localStorage.setItem("playerID", playerID);
    }

    return playerID;
  };

  const getTurnFromIndex = (idx: number) => {
    return idx % 2 === 0 ? PlayerState.Circle : PlayerState.Cross;
  };

  let gameID = useLocation().query.id;
  if (!gameID) {
    gameID = v4();
    const navigate = useNavigate();
    navigate(`/?id=${gameID}`, { replace: true });
  }
  const gameNode = gun.get(gameID);

  const playerID = getPlayer();

  gameNode.get("players").once((data) => {
    if (!data) {
      gameNode.put({ players: { ...[playerID] } });
    }
  });

  gameNode.get("players").on((data) => {
    const values = Object.values(data);
    const players = values.slice(0, values.length - 1) as string[];
    if (!players.includes(playerID)) {
      gameNode.put({ players: { ...[playerID, ...players] } });
      myTurn = getTurnFromIndex(players.length);
    } else {
      myTurn = getTurnFromIndex(players.indexOf(playerID));
    }
  });

  gameNode.get("field").on((data) => {
    const values = Object.values(data);
    const field = values.slice(0, values.length - 1) as PlayerState[];
    setState(field);
  });

  gameNode.get("turn").on((data) => {
    setTurn(data);
  });

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
