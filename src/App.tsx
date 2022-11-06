import type { Component } from "solid-js";
import Field from "./components/field";

const App: Component = () => {
  return (
    <div>
      <div class="absolute inset-0 flex justify-center items-center">
        <Field />
      </div>
    </div>
  );
};

export default App;
