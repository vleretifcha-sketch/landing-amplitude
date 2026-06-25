import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SubscribePage } from "./pages/SubscribePage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import "./index.css";

const path = window.location.pathname.replace(/\/$/, "") || "/";

function Page() {
  if (path === "/abonnement") return <SubscribePage />;
  if (path === "/payment-success") return <PaymentSuccessPage />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
