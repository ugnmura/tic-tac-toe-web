import { useLocation } from "@solidjs/router";
import { Component, createSignal, Setter, Show } from "solid-js";
import { v4 } from "uuid";
import Modal from "../../components/modal";
import { createGame, gameExists } from "../../utils/gameManager";
import { MenuModal } from "../menu";

export interface CreateGameMenuProps {
  setMenu: Setter<MenuModal>;
}

const CreateGameMenu: Component<CreateGameMenuProps> = (props) => {
  const [error, setError] = createSignal<string | undefined>(undefined);
  const loc = useLocation();
  const pathname = loc.pathname;

  let modalInput: HTMLInputElement | undefined;

  return (
    <Modal cancel={() => props.setMenu("main")}>
      <form>
        <span class="flex justify-between items-center flex-col sm:flex-row gap-x-2">
          <label for="creategameinput">Game ID (leave blank for random)</label>
          <input
            id="creategameinput"
            ref={modalInput}
            type="text"
            class="px-2 rounded border-green border-2 w-[max(80vw, 20rem)]"
          />
        </span>
        <Show when={error !== undefined}>
          <span class="block text-red-500">{error}</span>
        </Show>
        <button
          class="bg-terra mt-2 border-green border-2 px-3 py-1 rounded float-right"
          onClick={async (e) => {
            e.preventDefault();

            const gameID = modalInput?.value || v4();
            const exists = await gameExists(gameID);

            if (!exists) {
              await createGame(gameID);
            } else {
              setError("Game already exists!");
              return;
            }

            document.location.href = `${pathname}/game/?id=${gameID}`;
          }}
        >
          Create
        </button>
        <button
          class="bg-lavender mt-2 border-green border-2 px-3 py-1 rounded float-left"
          onClick={async (e) => {
            e.preventDefault();
            props.setMenu("main");
          }}
        >
          Back
        </button>
      </form>
    </Modal>
  );
};

export default CreateGameMenu;
