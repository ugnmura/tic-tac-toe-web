import { useLocation } from "@solidjs/router";
import { Component, createSignal, Setter, Show } from "solid-js";
import Modal from "../../components/modal";
import { gameExists } from "../../utils/gameManager";
import { MenuModal } from "../menu";

export interface JoinGameMenuProps {
  setMenu: Setter<MenuModal>;
}

const JoinGameMenu: Component<JoinGameMenuProps> = (props) => {
  const [error, setError] = createSignal<string | undefined>(undefined);
  const loc = useLocation();
  const pathname = loc.pathname;

  let modalInput: HTMLInputElement | undefined;

  return (
    <Modal cancel={() => props.setMenu("main")}>
      <form>
        <span class="flex justify-between items-center flex-col sm:flex-row gap-x-2">
          <label for="joingameinput">Game ID</label>
          <input
            id="joingameinput"
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

            if (modalInput?.value) {
              const exists = await gameExists(modalInput.value);
              if (!exists) {
                setError("Game does not exist!");
                return;
              }
              document.location.href = `${pathname}/game/?id=${modalInput.value}`;
            }
          }}
        >
          Join
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

export default JoinGameMenu;
