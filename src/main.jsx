import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// ✅ Registro correto do Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker registrado com sucesso!", registration);
      })
      .catch((error) => {
        console.error("❌ Erro ao registrar o Service Worker:", error);
      });
  });
}
