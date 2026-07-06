import { useEffect, useMemo } from "react";

function getPaymentEmail(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("email") || sessionStorage.getItem("amplitude_payment_email");
}

export function PaymentSuccessPage() {
  const email = useMemo(() => getPaymentEmail(), []);

  useEffect(() => {
    document.title = "Bienvenue sur Amplitude";
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
        background: "#0B0B0B",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
        gap: "1.25rem",
      }}
    >
      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
        Paiement confirmé, bienvenue sur Amplitude !
      </p>

      <p
        style={{
          margin: 0,
          maxWidth: 360,
          fontSize: 15,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        Téléchargez l&apos;application Amplitude depuis l&apos;App Store, puis connectez-vous avec{" "}
        {email ? (
          <strong style={{ color: "#A6DCBB" }}>{email}</strong>
        ) : (
          "l'adresse email utilisée pour le paiement"
        )}
        . Il vous sera demandé de créer votre mot de passe lors de la première connexion.
      </p>
    </div>
  );
}
