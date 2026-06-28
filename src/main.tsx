import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SubscribePage } from "./pages/SubscribePage";
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage";
import { LegalDocumentPage } from "./pages/LegalDocumentPage";
import { isLegalPath } from "./lib/legalRoutes";
import { persistPaymentReturnParams } from "./lib/deepLink";
import "./index.css";

persistPaymentReturnParams();

const path = window.location.pathname.replace(/\/$/, "") || "/";

function Page() {
  if (path === "/abonnement") return <SubscribePage />;
  if (path === "/payment-success") return <PaymentSuccessPage />;
  if (isLegalPath(path)) return <LegalDocumentPage path={path} />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
