import type { Component, JSX } from "solid-js";

export interface LayoutProps {
  children?: JSX.Element | [JSX.Element];
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <div class="absolute inset-0 flex justify-center flex-col items-center bg-artichoke overflow-hidden">
      {props.children}
    </div>
  );
};

export default Layout;
