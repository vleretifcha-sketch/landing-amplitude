import { Reveal } from "./Reveal";

const steps = [
  {
    num: 1,
    title: "Un objectif précis",
    desc: "Chaque mois, un nouveau programme pour progresser en souplesse et mobilité : grand écart, pancakes, mobilité fonctionnelle… Une direction claire, pas une bibliothèque infinie.",
  },
  {
    num: 2,
    title: "Suivez la méthode",
    desc: "Un cours signature guidé plus deux entraînements complémentaires par semaine. Répétition, régularité, précision comme en musculation.",
  },
  {
    num: 3,
    title: "Progresser en plusieurs semaines",
    desc: "Un format identique à répéter pour ancrer les mouvements, gagner en aisance et mesurer ses progrès. La régularité et la répétition sont les clés pour obtenir des résultats.",
  },
];

export function Process() {
  return (
    <section id="process" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="section-header">
            <p className="label-accent">Processus</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Comment ça marche
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-10 sm:mt-12 lg:mt-14 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12 xl:gap-16">
          <div className="flex flex-col gap-5">
            {steps.map((step) => (
              <article key={step.num} className="card-dark p-6 sm:p-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-on-gold">
                  {step.num}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-light">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <img
              src="/images/process-phones.png"
              alt="Aperçu de l'application Amplitude"
              width={384}
              height={616}
              className="w-full max-w-[384px] select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
