import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "En quoi Amplitude est différent d'une app de stretching classique ?",
    a: "Ce n'est pas une bibliothèque de centaines de vidéos. C'est une méthode structurée : 1 objectif par mois, 1 cours signature, 2 trainings complémentaires, 3 séances max par semaine.",
  },
  {
    q: "Faut-il s'entraîner tous les jours ?",
    a: "Non. La progression vient de la régularité et de la répétition intelligente, pas du volume. Maximum 3 séances de 20 à 30 minutes par semaine.",
  },
  {
    q: "Pour qui est cette méthode ?",
    a: "Pour les personnes qui font du fitness, de la musculation ou du pilates et veulent devenir souples sans adopter le mode de vie d'une danseuse ou gymnaste.",
  },
  {
    q: "Combien de temps pour voir des résultats ?",
    a: "Chaque programme suit un cycle de 4 semaines avec un objectif précis. La cohérence et la précision du mouvement priment sur la quantité.",
  },
  {
    q: "Puis-je rejoindre la liste d'attente avant le lancement ?",
    a: "Oui. Inscrivez-vous pour être informé en priorité du lancement et accéder aux premières méthodes signatures.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
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
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-light transition-transform duration-200"
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
