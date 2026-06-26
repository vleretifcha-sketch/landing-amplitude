import { useEffect, useState } from "react";
import { buildPaymentSuccessUrl, openDeepLink } from "../lib/deepLink";

const deepLinkUrl = buildPaymentSuccessUrl();

export function PaymentSuccessPage() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    document.title = "Retour vers Amplitude";
    openDeepLink(deepLinkUrl);

    const timer = setTimeout(() => setShowFallback(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#000",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p>Retour vers l&apos;app Amplitude…</p>
      <p id="fallback" style={{ display: showFallback ? "block" : "none" }}>
        Si l&apos;app ne s&apos;ouvre pas,{" "}
        <a
          href={deepLinkUrl}
          style={{ color: "#EEDC9A" }}
          onClick={(e) => {
            e.preventDefault();
            openDeepLink(deepLinkUrl);
          }}
        >
          cliquez ici
        </a>
        .
      </p>
    </div>
  );
}
