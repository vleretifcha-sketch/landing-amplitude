import { Reveal } from "./Reveal";

const tools = [
  {
    title: "Mobilité active pré-training",
    description:
      "Prépare ton corps avant ta séance de sport — haut du corps, jambes.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2 4.5 13h6L11 22l8.5-11h-6z" />
      </svg>
    ),
  },
  {
    title: "Routines de récupération",
    description:
      "Pour tes jours de repos. La récupération fait partie de la progression.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "Un espace conseils",
    description:
      "Des vidéos courtes pour comprendre tes placements et éviter les erreurs courantes.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v3M8 20l1.5-5h5L16 20" />
      </svg>
    ),
  },
  {
    title: "Mesure photo",
    description:
      "Place 3 points sur ta photo, l'app calcule ton angle et te permet d'évaluer tes progrès de semaine en semaine.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 8h4l1.5-2h7L17 8h4v11H3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    title: "Statistiques & calendrier",
    description:
      "Programme tes séances, suis ta progression (« tu es à 43 % »), reçois tes rappels.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4v16h16" />
        <path d="M8 15l3-4 3 2 4-6" />
      </svg>
    ),
  },
  {
    title: "Communauté & santé",
    description:
      "Une communauté privée pour partager tes résultats. Apple Santé & Google Santé connectés.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21C5 16 3 11 3 8a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 3-2 8-9 13z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="label-accent">Fonctionnalités</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Tout pour progresser
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Reveal key={tool.title} delay={80 + index * 60}>
              <article className="card-dark h-full p-6 sm:p-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold-subtle text-gold">
                  {tool.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug sm:mt-6">{tool.title}</h3>
                <p className="mt-3 text-sm leading-[1.75] text-muted-light sm:mt-3.5">
                  {tool.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
