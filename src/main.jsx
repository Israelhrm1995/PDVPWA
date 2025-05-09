import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyPolyfills as applyBlocks, defineCustomElements as defineBlocks } from "@sankhyalabs/sankhyablocks/loader";
import { applyPolyfills, defineCustomElements } from "@sankhyalabs/ezui/loader";
import "@sankhyalabs/ez-design/dist/default/ez-themed.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// ✅ Registra o Service Worker para cache/offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const isDev = import.meta.env.DEV;
    const swPath = isDev
      ? "/service-worker.js"
      : `${import.meta.env.BASE_URL}service-worker.js`;

    navigator.serviceWorker
      .register(swPath)
      .then((registration) => {
        console.log("✅ Service Worker registrado com sucesso!", registration);
      })
      .catch((error) => {
        console.error("❌ Erro ao registrar o Service Worker:", error);
      });
  });
}
 
applyPolyfills().then(() => defineCustomElements());
applyBlocks().then(() => defineBlocks());
