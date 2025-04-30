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
 
applyPolyfills().then(() => defineCustomElements());
applyBlocks().then(() => defineBlocks());