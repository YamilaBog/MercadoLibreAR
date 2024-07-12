import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import React from "react";

const container = document.getElementById("root-remote") as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);
