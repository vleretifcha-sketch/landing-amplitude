import { useMemo } from "react";
import { Logo } from "../components/Logo";

/**
 * Page relais du reset de mot de passe : l'email pointe ici (lien https
 * cliquable partout), et le bouton — un vrai geste utilisateur, que les
 * scanners d'emails ne déclenchent pas — ouvre l'app avec le token_hash.
 * Le token n'est consommé que par l'app via verifyOtp, jamais par un GET.
 */
export function ResetPasswordRelayPage() {
  const appLink = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    if (!tokenHash) return null;
    const type = params.get("type") ?? "recovery";
    return `amplitude://reset-password?token_hash=${encodeURIComponent(
      tokenHash,
    )}&type=${encodeURIComponent(type)}`;
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <header className="mx-auto w-full max-w-lg">
        <a href="/" aria-label="Amplitude ; accueil">
          <Logo className="h-7 w-auto" />
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10 sm:py-14">
        <article className="card-dark p-6 sm:p-8">
          <p className="label-accent">Mot de passe</p>

          {appLink ? (
            <>
              <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Réinitialiser votre mot de passe
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
                Appuyez sur le bouton ci-dessous pour ouvrir l&apos;application
                Amplitude et choisir un nouveau mot de passe.
              </p>
              <a href={appLink} className="btn-primary mt-8 block w-full text-center">
                Ouvrir l&apos;application
              </a>
              <p className="mt-4 text-center text-xs text-muted">
                Ce lien est à usage unique. Si rien ne s&apos;ouvre, assurez-vous
                d&apos;être sur le téléphone où l&apos;application Amplitude est
                installée.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Lien invalide
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
                Ce lien de réinitialisation est incomplet ou a expiré. Refaites
                une demande « Mot de passe oublié » depuis l&apos;application.
              </p>
            </>
          )}
        </article>
      </main>
    </div>
  );
}
