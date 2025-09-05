import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FileProvider } from "./contexts/File/FileContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </React.StrictMode>,
);
