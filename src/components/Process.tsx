import { Reveal } from "./Reveal";
import { RevealGroup } from "./RevealGroup";

const steps = [
  {
    num: 1,
    title: "Choisissez votre objectif",
    desc: "Chaque mois, un objectif précis : grand écart, pancake, mobilité hanches… Une direction claire, pas une bibliothèque infinie.",
  },
  {
    num: 2,
    title: "Suivez la méthode",
    desc: "1 cours signature guidé + 2 trainings complémentaires par semaine. Répétition, régularité, précision — comme en musculation.",
  },
  {
    num: 3,
    title: "Progressez en 4 semaines",
    desc: "Un format identique, une progression mesurable. Peu de contenu, extrêmement qualitatif, des résultats visibles.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="label-accent">Processus</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Comment ça marche
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={300}>
          {steps.map((step) => (
            <article key={step.num} className="card-dark h-full p-6 sm:p-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                {step.num}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-light">
                {step.desc}
              </p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
