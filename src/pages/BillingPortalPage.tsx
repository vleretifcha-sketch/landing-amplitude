import { useEffect, useState } from "react";
import { Logo } from "../components/Logo";
import { supabase } from "../lib/supabase";

const FUNCTIONS_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(
    ".supabase.co",
    ".supabase.co/functions/v1",
  ) ?? "";

type Status = "loading" | "redirecting" | "error";

export function BillingPortalPage() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!supabase) {
      setStatus("error");
      return;
    }

    let cancelled = false;

    async function openPortal(accessToken: string) {
      try {
        const response = await fetch(`${FUNCTIONS_URL}/create-stripe-portal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ return_url: window.location.origin }),
        });
        const data = (await response.json()) as { url?: string };
        if (!response.ok || !data.url) throw new Error("no portal url");
        if (!cancelled) {
          setStatus("redirecting");
          window.location.href = data.url;
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.access_token) {
          void openPortal(session.access_token);
        }
      },
    );

    // Le lien magique est déjà traité automatiquement par le client Supabase
    // (detectSessionInUrl). On vérifie aussi une session déjà active au cas où.
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session?.access_token) {
        void openPortal(data.session.access_token);
      }
    });

    const timeout = setTimeout(() => {
      if (!cancelled) setStatus((current) => (current === "loading" ? "error" : current));
    }, 8000);

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-bg px-4 py-8 text-center sm:px-6">
      <a href="/" aria-label="Amplitude ; accueil" className="mb-10">
        <Logo className="h-7 w-auto" />
      </a>

      {status === "error" ? (
        <article className="card-dark max-w-md p-6 sm:p-8">
          <h1 className="text-xl font-medium tracking-tight">
            Lien invalide ou expiré
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-light">
            Ce lien n&apos;est plus valable. Retournez sur la page de gestion
            d&apos;abonnement pour en recevoir un nouveau.
          </p>
          <a href="/gerer-abonnement" className="btn-primary mt-6 inline-block">
            Redemander un lien
          </a>
        </article>
      ) : (
        <p className="text-sm text-muted-light">
          {status === "redirecting"
            ? "Redirection vers votre espace de facturation…"
            : "Vérification de votre lien…"}
        </p>
      )}
    </div>
  );
}
