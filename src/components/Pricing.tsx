import { Reveal } from "./Reveal";

const features = [
  "Programme mensuel",
  "Cours signature",
  "Vidéos explicatives",
  "Warm up mobilité active",
];

export function Pricing() {
  return (
    <section id="tarifs" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-20">
        <Reveal>
          <p className="label-accent">Tarifs</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
            Un abonnement,
            <br />
            toute la méthode
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
            Programmes, séances guidées et entraînements complémentaires — tout
            est inclus, renouvelé chaque mois.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <article className="card-dark p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-end gap-3">
                <span className="text-6xl font-semibold leading-none tracking-tighter sm:text-7xl">
                  39
                </span>
                <div className="pb-1.5">
                  <span className="block text-2xl font-medium leading-none">€</span>
                  <span className="mt-1 block text-sm text-muted-light">par mois</span>
                </div>
              </div>
              <a href="#" className="btn-primary w-full shrink-0 sm:w-auto">
                Commencer
              </a>
            </div>

            <ul className="mt-8 space-y-2.5 border-t border-border pt-8">
              {features.map((feature) => (
                <li key={feature} className="text-sm font-semibold text-text">
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
