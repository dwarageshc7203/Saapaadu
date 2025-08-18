// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // ✅ only once, for global styles
import Homepage from "./pages/Homepage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>
);
