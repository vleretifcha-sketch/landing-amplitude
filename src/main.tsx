import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SubscribePage } from "./pages/SubscribePage";
import "./index.css";

const path = window.location.pathname.replace(/\/$/, "") || "/";
const isSubscribePage = path === "/abonnement";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isSubscribePage ? <SubscribePage /> : <App />}
  </StrictMode>,
);
