import { useEffect, useState } from "react";

export function PaymentSuccessPage() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    document.title = "Retour vers Amplitude";

    const params = new URLSearchParams(window.location.search);
    let url = params.get("app_success") || "amplitude://payment-success";

    if (!params.get("app_success") && params.toString()) {
      url += (url.indexOf("?") === -1 ? "?" : "&") + params.toString();
    }

    window.location.replace(url);

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
        <a href="amplitude://payment-success" style={{ color: "#EEDC9A" }}>
          cliquez ici
        </a>
        .
      </p>
    </div>
  );
}
