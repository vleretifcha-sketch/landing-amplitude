import { useState } from "react";
import { Reveal } from "./Reveal";

const programs = [
  {
    id: "hips",
    title: "Mobilité de hanches",
    duration: "6 semaines",
    subtitle: "La mobilité au service du mouvement",
    description:
      "Débloque tes hanches pour un squat plus profond, des écarts plus alignés, un mouvement plus libre dans ton sport ou une figure qui passe en pole. Une mobilité utile.",
    image: "/images/programs/hips.jpg",
    imageAlt: "Mobilité de hanches",
  },
  {
    id: "split",
    title: "Grand écart latéral",
    duration: "6 semaines",
    subtitle: "La répétition crée la progression",
    description:
      "Un objectif, une direction. Chaque semaine, ton amplitude gagne des degrés ; comme une charge qui monte à la muscu. Tu sais exactement quoi faire, et tu le mesures.",
    image: "/images/programs/split.png",
    imageAlt: "Grand écart latéral",
  },
  {
    id: "back",
    title: "Mobilité de dos et d'épaules",
    duration: "4 semaines",
    subtitle: "Pour un dos et des épaules plus mobiles et solides",
    description:
      "Gagner en amplitude avec des charges légères, pour développer la force qui te permet de contrôler tes mouvements. Tu ne choisis plus entre force et souplesse.",
    image: "/images/programs/back.jpg",
    imageAlt: "Mobilité de dos et d'épaules",
  },
];

export function Features() {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return (
    <section id="fonctionnalites" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="label-accent">100% mobile, 100% résultats</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Une app qui s&apos;adapte à tes objectifs
            </h2>
            <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
              Chaque mois, un nouveau cours ou programme signature construit autour
              d&apos;un objectif précis. Pas une bibliothèque infinie ; une direction
              claire, à chaque fois.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-10">
          <div>
            <div className="flex flex-col gap-3.5 sm:gap-4" role="tablist" aria-label="Programmes">
              {programs.map((program, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={program.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`program-panel-${program.id}`}
                    id={`program-tab-${program.id}`}
                    onClick={() => setActive(index)}
                    className={`w-full cursor-pointer rounded-2xl border px-5 py-5 text-left transition-colors duration-200 sm:px-6 sm:py-6 ${
                      isActive
                        ? "border-gold/30 bg-gold-subtle"
                        : "border-border bg-card hover:border-gold/20 hover:bg-card-hover"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`text-base font-semibold sm:text-lg ${
                          isActive ? "text-text" : "text-muted-light"
                        }`}
                      >
                        {program.title}
                      </span>
                      <span className="shrink-0 text-xs text-muted sm:text-sm">
                        {program.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-snug text-muted-light">{program.subtitle}</p>
                  </button>
                );
              })}
            </div>

            <article
              id={`program-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`program-tab-${current.id}`}
              className="card-dark mt-6 p-6 sm:mt-7 sm:p-8"
            >
              <p className="text-sm leading-[1.75] text-muted-light sm:text-base">
                {current.description}
              </p>
            </article>
          </div>

          <Reveal delay={120} className="min-h-[20rem] lg:min-h-[24rem]">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-3xl border border-border lg:min-h-[24rem]">
              {programs.map((program, index) => (
                <img
                  key={program.id}
                  src={program.image}
                  alt={program.imageAlt}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    index === active ? "opacity-100" : "opacity-0"
                  } ${program.id === "hips" ? "object-[50%_52%]" : program.id === "back" ? "object-[50%_40%]" : "object-center"}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
