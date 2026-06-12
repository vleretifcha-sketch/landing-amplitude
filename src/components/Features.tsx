import { useState } from "react";
import { Reveal } from "./Reveal";

const features = [
  {
    id: "programme",
    label: "Programme guidé",
    title: "Une direction claire",
    description:
      "Chaque mois, un nouveau programme : grand écart, mobilité fonctionnelle, souplesse du dos… Tous suivent la même direction pour développer ta souplesse et ta mobilité de façon complète et équilibrée.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    ),
  },
  {
    id: "mesure",
    label: "Mesure photo",
    title: "Des progrès mesurables",
    description:
      "Analyse tes amplitudes grâce à l'outil de mesure des angles, puis suis ton évolution avec des statistiques et des graphiques qui montrent précisément tes progrès au fil du temps.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
    ),
  },
  {
    id: "progres",
    label: "Progrès",
    title: "Progresser en plusieurs semaines",
    description:
      "Un format identique à répéter pour ancrer les mouvements, gagner en aisance et mesurer ses progrès. La régularité et la répétition sont les clés pour obtenir des résultats.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />
      </svg>
    ),
  },
  {
    id: "methodes",
    label: "Méthodes",
    title: "Suivez la méthode",
    description:
      "Un cours signature guidé plus deux entraînements complémentaires par semaine. Répétition, régularité, précision.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "communaute",
    label: "Communauté",
    title: "Partagez avec les autres membres",
    description:
      "Publiez vos progrès, consultez les profils des autres élèves et échangez au sein d'une communauté privée — vous progressez ensemble, pas seul.",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3 1.343 3 3 3z" />
        <path d="M8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z" />
        <path d="M2 20c0-2.761 2.686-5 6-5" />
        <path d="M22 20c0-2.761-2.686-5-6-5" />
        <path d="M12 20c0-2.761 1.343-5 4-5" />
      </svg>
    ),
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const current = features[active];

  return (
    <section id="fonctionnalites" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-accent">L&apos;app</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Tout ce qu&apos;il faut pour progresser
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-light sm:text-base">
            Une app pensée comme un coach : objectif mensuel, séances guidées, mesures
            précises, méthodes structurées et communauté pour partager vos progrès.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 flex flex-col gap-4 sm:mt-12 lg:mt-14">
            <div
              className="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:gap-3"
              role="tablist"
              aria-label="Fonctionnalités"
            >
              {features.map((feature, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`feature-panel-${feature.id}`}
                    id={`feature-tab-${feature.id}`}
                    onClick={() => setActive(index)}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 sm:px-4 sm:py-3 lg:w-auto lg:justify-start lg:px-4 lg:py-3.5 ${
                      isActive
                        ? "border-gold/30 bg-gold-subtle"
                        : "border-border bg-card hover:border-gold/20 hover:bg-card-hover"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-gold/20 text-gold"
                          : "bg-chip-bg text-muted-light"
                      }`}
                    >
                      {feature.icon}
                    </span>
                    <span
                      className={`whitespace-nowrap text-sm transition-colors ${
                        isActive ? "font-semibold text-text" : "font-medium text-muted-light"
                      }`}
                    >
                      {feature.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <article
              id={`feature-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`feature-tab-${current.id}`}
              className="card-dark flex min-h-[12rem] flex-col justify-center p-6 sm:min-h-[14rem] sm:p-8"
            >
              <p className="label-accent w-fit">{current.label}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                {current.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
                {current.description}
              </p>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
