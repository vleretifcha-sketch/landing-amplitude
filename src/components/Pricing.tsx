import { Reveal } from "./Reveal";

const features = [
  "Programme mensuel",
  "Cours signature",
  "Vidéos explicatives",
  "Warm up mobilité active",
  "Communauté privée",
];

function PricingIntro() {
  return (
    <>
      <p className="label-accent">Tarifs</p>
      <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
        Un abonnement,
        <br />
        <span className="text-gold-gradient">toute la méthode</span>
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
        Programmes, séances guidées et entraînements complémentaires — tout est
        inclus, renouvelé chaque mois.
      </p>
    </>
  );
}

export function Pricing() {
  return (
    <section id="tarifs" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 sm:gap-12 lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
        <div className="flex flex-col gap-8 sm:gap-10">
          <Reveal className="hidden lg:block">
            <PricingIntro />
          </Reveal>

          <Reveal delay={120}>
            <article className="card-dark p-6 sm:p-8">
              <div className="lg:hidden">
                <PricingIntro />
              </div>

              <div className="mt-8 flex items-end gap-3 sm:hidden">
                <span className="text-6xl font-semibold leading-none tracking-tighter">
                  39
                </span>
                <div className="pb-1.5">
                  <span className="block text-2xl font-medium leading-none">€</span>
                  <span className="mt-1 block text-sm text-muted-light">par mois</span>
                </div>
              </div>

              <div className="mt-8 hidden items-end gap-3 sm:flex lg:mt-0">
                <span className="text-6xl font-semibold leading-none tracking-tighter sm:text-7xl">
                  39
                </span>
                <div className="pb-1.5">
                  <span className="block text-2xl font-medium leading-none">€</span>
                  <span className="mt-1 block text-sm text-muted-light">par mois</span>
                </div>
              </div>

              <ul className="mt-8 space-y-2.5 border-t border-border pt-8">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium text-muted-light">
                    <span
                      className="surface-inset flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-muted"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        <Reveal delay={180} className="flex justify-center lg:justify-end">
          <div className="preview-frame relative w-full max-w-[260px] overflow-hidden rounded-[2rem] sm:max-w-[280px] lg:max-w-[300px]">
            <img
              src="/images/app-home.png"
              alt="Aperçu de l'application Amplitude"
              className="block w-full object-cover object-top"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
