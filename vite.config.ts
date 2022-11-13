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
        manifest: {
          name: "Tic Tac Toe GunJS",
          short_name: "TTT",
          scope: ".",
          start_url: "/",
          icons: [
            {
              src: "assets/icons/manifest-icon-192.maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "assets/icons/manifest-icon-192.maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "assets/icons/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "assets/icons/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
          theme_color: "#002500",
          background_color: "#929982",
          display: "fullscreen",
          orientation: "portrait-primary",
        },
      }),
    ],
    server: {
      port: 3000,
    },
    build: {
      target: "esnext",
    },
    base: `/${process.env.VITE_BASE_PATH}/`,
  };
});
