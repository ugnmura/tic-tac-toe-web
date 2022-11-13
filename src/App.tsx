import { Component, lazy } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";
const Game = lazy(() => import("./views/game"));
const Menu = lazy(() => import("./views/menu"));

const App: Component = () => {
  return (
    <Router base={import.meta.env.VITE_BASE_PATH}>
      <Routes>
        <Route path="/" component={Menu}></Route>
        <Route path="/game" component={Game}></Route>
      </Routes>
    </Router>
  );
};

export default App;
