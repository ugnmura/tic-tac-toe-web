import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [
      solidPlugin(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
      }),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
    base: process.env.VITE_BASE_PATH,
  };
});
