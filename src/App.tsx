import type { Component } from "solid-js";
import Field from "./components/field";
import { Router } from "@solidjs/router";

const App: Component = () => {
  return (
    <Router>
      <div class="absolute inset-0 flex justify-center items-center">
        <Field />
      </div>
    </Router>
  );
};

export default App;
