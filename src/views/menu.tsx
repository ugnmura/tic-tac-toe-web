import { Component, createSignal, Match, Switch } from "solid-js";
import Layout from "../components/layout";
import CreateGameMenu from "./menu/createGameMenu";
import JoinGameMenu from "./menu/joinGameMenu";

export type MenuModal = "main" | "join" | "create";

const Menu: Component = () => {
  const [menu, setMenu] = createSignal<MenuModal>("main");

  return (
    <Layout>
      <h1 class="text-3xl text-center">Welcome to Tic Tac Toe!</h1>
      <div class="m-2 flex gap-x-3">
        <button
          onClick={() => setMenu("create")}
          class="btn hover-shadow border-4 my-4 py-2 px-4"
        >
          Create Game
        </button>
        <button
          onClick={() => setMenu("join")}
          class="btn hover-shadow border-4 my-4 py-2 px-4"
        >
          Join Game
        </button>
      </div>

      <Switch>
        <Match when={menu() === "create"}>
          <CreateGameMenu setMenu={setMenu} />
        </Match>
        <Match when={menu() === "join"}>
          <JoinGameMenu setMenu={setMenu} />
        </Match>
      </Switch>
    </Layout>
  );
};

export default Menu;
