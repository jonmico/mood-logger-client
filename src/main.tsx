import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import "./styles/reset.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
