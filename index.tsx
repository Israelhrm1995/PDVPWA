import * as React from "react";
import ReactDOM from "react-dom/client";
import { applyPolyfills as applyBlocks, defineCustomElements as defineBlocks } from "@sankhyalabs/sankhyablocks/loader";
import { applyPolyfills, defineCustomElements } from "@sankhyalabs/ezui/loader";
import "@sankhyalabs/ez-design/dist/default/ez-themed.min.css";
import App from './src/App'

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
);

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
 
applyPolyfills().then(() => defineCustomElements());
applyBlocks().then(() => defineBlocks());