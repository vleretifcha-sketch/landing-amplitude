import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

/**
 * Aperçu de l'app basé sur le vrai code : la page /app-preview de l'app Expo
 * (mêmes composants FloatingTabBar, SessionCard, ProgramCard que le natif)
 * est exportée en web (`expo export -p web`) et servie ici en iframe, dans
 * public/app-preview/. Voir app/app-preview.tsx dans le repo de l'app.
 */

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="relative aspect-[390/844] w-full rounded-[2.75rem] border-[6px] border-[#2a2a2a] bg-black p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-[#0b0b0b]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function AppPreviewFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldLoad ? (
        <iframe
          src="/app-preview"
          title="Aperçu de l'application Amplitude"
          className="h-full w-full border-0"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-gold" />
        </div>
      )}
    </div>
  );
}

export function InteractiveAppPreview() {
  return (
    <section
      aria-label="Aperçu de l'application Amplitude"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="section-header">
            <p className="label-accent">Essaie par toi-même</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Navigue dans l&apos;app{" "}
              <span className="text-gold">avant même de la télécharger.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-light sm:mt-7 sm:text-base">
              Utilise la barre de navigation ci-dessous pour explorer les
              différents espaces de l&apos;app — accueil, méthodes, calendrier,
              progrès et communauté.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 sm:mt-14">
            <PhoneFrame>
              <AppPreviewFrame />
            </PhoneFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
