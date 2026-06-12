import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "En quoi Amplitude est différente des autres applications de stretching ?",
    a: "Ce n'est pas une bibliothèque de centaines de vidéos. C'est une méthode structurée. Il est rare de trouver une approche qui maîtrise à la fois la mobilité et la souplesse. Cette application s'appuie sur plus de 10 ans d'expertise pour vous accompagner aussi bien vers une meilleure mobilité fonctionnelle que vers des objectifs avancés comme le grand écart. Une méthode claire, structurée et pensée pour obtenir des résultats durables grâce à la régularité.",
  },
  {
    q: "Faut-il s'entraîner tous les jours ?",
    a: "Non. La progression ne dépend pas du nombre d'heures passées à s'étirer, mais de la qualité de votre pratique et de votre régularité. Quelques minutes de mobilité avant vos séances, associées à 2 ou 3 séances structurées par semaine, produiront souvent de meilleurs résultats que des entraînements quotidiens difficiles à maintenir. La récupération fait partie intégrante de la progression.",
  },
  {
    q: "Pour qui est cette méthode ?",
    a: "Cette méthode s'adresse à toutes les personnes qui souhaitent mieux bouger. Que vous cherchiez à améliorer votre mobilité pour votre pratique sportive, à développer une souplesse avancée comme le grand écart, ou simplement à gagner en aisance dans votre corps au quotidien, vous trouverez ici une approche structurée, progressive et conçue pour produire des résultats durables.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    a: "Les premiers progrès peuvent apparaître rapidement, mais les transformations les plus importantes demandent du temps. Pour des objectifs comme le grand écart ou le pancake, nous recommandons de suivre le même programme pendant 3 mois. La progression vient de la répétition, de la régularité et de la qualité d'exécution, pas de la nouveauté.",
  },
  {
    q: "Est-ce adapté pour les débutants ?",
    a: "Les programmes sont conçus pour s'adapter à différents niveaux. Que vous débutiez ou que vous travailliez déjà des objectifs avancés, vous trouverez des options et des progressions adaptées à votre mobilité actuelle.",
  },
  {
    q: "Que faire si je manque une semaine ?",
    a: "Aucune inquiétude. La progression en souplesse se construit sur le long terme. Reprenez simplement là où vous vous êtes arrêté et concentrez-vous sur la régularité plutôt que sur la perfection.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="label-accent">Réponses</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            FAQ
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={80 + i * 70}>
                <div className="card-dark overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-card-hover"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium sm:text-base">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 ${
                        isOpen
                          ? "border-gold/40 bg-gold-subtle text-gold"
                          : "border-border text-muted-light"
                      }`}
                      style={{ transform: isOpen ? "rotate(45deg)" : undefined }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-border px-6 pb-5">
                      <p className="pt-4 text-sm leading-relaxed text-muted-light">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
