import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import { Layout } from "./layout/Layout.jsx";
import "@monorepo/shared/globals";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
