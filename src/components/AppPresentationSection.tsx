import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

function PhoneMockup({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={505}
      height={1024}
      className={`block h-auto w-full ${className}`}
    />
  );
}

const highlights = [
  {
    title: "Des cours guidés en mobilité et souplesse active et passive",
    description:
      "Le cœur de la méthode : coaché en vidéo ; respiration, alignement, amplitude.",
  },
  {
    title: "La logique de progression de la muscu",
    description:
      "Structure, répétition, une amplitude qui gagne des degrés ; appliquée à des séances de mobilité.",
  },
  {
    title: "Un programme ciblé par objectif",
    description:
      "Grand écart, mobilité des hanches, du dos et des épaules. Tu sais toujours quoi faire.",
  },
];

function StoreButton({
  href,
  icon,
  label,
  store,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  store: string;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-xl border border-border-light bg-card px-4 py-2.5 transition-colors duration-200 hover:border-gold/40 hover:bg-card-hover"
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[10px] text-muted-light">{label}</span>
        <span className="block text-sm font-semibold text-text">{store}</span>
      </span>
    </a>
  );
}

export function AppPresentationSection() {
  return (
    <section
      id="app"
      aria-label="Présentation de l'application Amplitude"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-16">
          <div>
            <Reveal>
              <p className="label-accent">App Amplitude</p>
              <h2 className="mt-5 max-w-xl text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
                <span className="block">Amplitude.</span>
                <span className="block">La souplesse</span>
                <span className="block text-gold">à portée de mains.</span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-light sm:mt-7 sm:text-base">
                L&apos;aboutissement de 10 ans de pratique, d&apos;erreurs et
                d&apos;enseignement ; réuni dans une appli pensée pour tous : du
                télétravailleur sédentaire jusqu&apos;aux sportifs
                professionnels.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-6 sm:mt-12">
              {highlights.map((item, index) => (
                <Reveal key={item.title} delay={80 + index * 60}>
                  <li className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-sm font-semibold text-gold"
                    >
                      ✓
                    </span>
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-light">
                        {item.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
                <StoreButton
                  href="#tarifs"
                  label="Télécharger sur"
                  store="l'App Store"
                  icon={
                    <svg
                      className="h-6 w-6 shrink-0 text-text"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.29 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.13 5.82c.64-.78 1.07-1.85.95-2.93-.92.04-2.04.61-2.7 1.38-.59.68-1.11 1.79-.97 2.83 1.03.08 2.08-.52 2.72-1.28z" />
                    </svg>
                  }
                />
                <StoreButton
                  href="#tarifs"
                  label="Disponible sur"
                  store="Google Play"
                  icon={
                    <svg
                      className="h-6 w-6 shrink-0 text-text"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M3.609 1.814 13.792 12 3.61 22.186a1.003 1.003 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.802 8.99l-2.303 2.303-8.635-8.635z" />
                    </svg>
                  }
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[520px] px-4 py-10 sm:px-8 sm:py-12 lg:mx-0">
              <div className="relative mx-auto flex max-w-[440px] items-end justify-center">
                <div className="relative z-[2] w-[52%] max-w-[238px] shrink-0 -rotate-3">
                  <PhoneMockup
                    src="/images/app/home.png"
                    alt="Amplitude ; accueil"
                  />
                </div>
                <div className="relative z-[1] -ml-[32%] mb-6 w-[46%] max-w-[210px] shrink-0 rotate-3 sm:-ml-[34%]">
                  <PhoneMockup
                    src="/images/app/methods.png"
                    alt="Amplitude ; méthodes"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
