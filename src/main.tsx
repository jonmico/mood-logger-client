import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import "./styles/reset.css";
import "./styles/global.css";
import "@fontsource-variable/inter/wght.css";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import AppLayout from "./layouts/AppLayout";
import Moods from "./pages/Moods";
import Chart from "./pages/Chart";
import CreateMood from "./pages/CreateMood";
import Mood from "./pages/Mood";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedLayout />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/moods" element={<Moods />} />
                <Route path="/moods/create" element={<CreateMood />} />
                <Route path="/moods/:id" element={<Mood />} />
                <Route path="/chart" element={<Chart />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
