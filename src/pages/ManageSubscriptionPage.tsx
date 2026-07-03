import { useState, type FormEvent } from "react";
import { Logo } from "../components/Logo";

const FUNCTIONS_URL =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(
    ".supabase.co",
    ".supabase.co/functions/v1",
  ) ?? "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

type Status = "idle" | "sending" | "sent" | "error";

export function ManageSubscriptionPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!FUNCTIONS_URL || !SUPABASE_ANON_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(
        `${FUNCTIONS_URL}/request-billing-portal-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        },
      );
      if (!response.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <header className="mx-auto w-full max-w-lg">
        <a href="/" aria-label="Amplitude ; accueil">
          <Logo className="h-7 w-auto" />
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10 sm:py-14">
        <article className="card-dark p-6 sm:p-8">
          <p className="label-accent">Abonnement</p>
          <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            Gérer mon abonnement
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
            Entrez l&apos;adresse email utilisée lors de votre paiement. Si un
            abonnement y est associé, vous recevrez un lien sécurisé par email
            pour accéder à votre espace de facturation (modifier votre moyen
            de paiement, résilier, consulter vos factures).
          </p>

          {status === "sent" ? (
            <p className="surface-inset mt-8 rounded-2xl p-4 text-sm text-muted-light">
              Si cet email est associé à un abonnement, vous allez recevoir un
              lien dans quelques instants. Pensez à vérifier vos spams.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-muted-light"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="surface-inset w-full rounded-full border border-border px-5 py-3 text-base text-white outline-none transition-colors focus:border-gold"
                />
              </div>

              {status === "error" ? (
                <p className="text-sm text-red-400">
                  Une erreur est survenue. Réessayez dans un instant.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full disabled:opacity-60"
              >
                {status === "sending" ? "Envoi…" : "Recevoir le lien"}
              </button>
            </form>
          )}
        </article>
      </main>
    </div>
  );
}
