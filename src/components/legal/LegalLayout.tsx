import type { ReactNode } from "react";
import { Logo } from "../Logo";

export function LegalLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh bg-bg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4">
        <a href="/" aria-label="Amplitude ; accueil">
          <Logo className="h-7 w-auto" />
        </a>
        <a
          href="/"
          className="text-sm font-medium text-muted-light transition-colors hover:text-gold"
        >
          ← Retour
        </a>
      </header>

      <main className="mx-auto w-full max-w-3xl py-10 sm:py-14">
        <article className="card-dark p-6 sm:p-8 lg:p-10">
          <p className="label-accent">Informations légales</p>
          <h1 className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 text-sm text-muted-light">{subtitle}</p>
          ) : null}
          <div className="legal-content mt-8">{children}</div>
        </article>
      </main>
    </div>
  );
}
