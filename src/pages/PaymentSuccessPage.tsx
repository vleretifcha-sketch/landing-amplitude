import { useEffect, useMemo, useState } from "react";
import { buildPaymentSuccessUrl, openDeepLink } from "../lib/deepLink";

export function PaymentSuccessPage() {
  const deepLinkUrl = useMemo(() => buildPaymentSuccessUrl(), []);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    document.title = "Retour vers Amplitude";

    const timer = setTimeout(() => setShowFallback(true), 1500);
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
        gap: "1.25rem",
      }}
    >
      <p style={{ margin: 0 }}>Retour vers l&apos;app Amplitude…</p>

      <button
        type="button"
        onClick={() => openDeepLink(deepLinkUrl, { fromUserGesture: true })}
        style={{
          margin: 0,
          padding: "14px 28px",
          borderRadius: 999,
          border: "none",
          background: "#EEDC9A",
          color: "#000",
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Ouvrir l&apos;app Amplitude
      </button>

      <p
        id="fallback"
        style={{
          display: showFallback ? "block" : "none",
          margin: 0,
          fontSize: 14,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.6,
        }}
      >
        L&apos;app ne s&apos;ouvre pas ? Installez Amplitude depuis l&apos;App Store ou le Play
        Store, puis rouvrez l&apos;app et connectez-vous avec le même email que sur Stripe.
      </p>
    </div>
  );
}
