import { Reveal } from "./Reveal";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";
import { LAUNCH_END } from "../lib/launch";

const plans = [
  {
    id: "amplitude",
    brand: "amplitude",
    title: "L'offre annuelle",
    price: "149",
    period: "/an",
    compareAt: "298 €",
    discount: "-50 %",
    features: [
      "Tous les cours et programmes signatures",
      "Nouvelles vidéos chaque mois",
      "Mobilité active, récupération, conseils",
      "Mesure photo, calendrier, statistiques",
      "Communauté privée",
      "Guide de la souplesse (PDF) offert",
      "7 jours satisfait ou remboursé",
    ],
    cta: "Rejoindre Amplitude",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE ??
      "https://buy.stripe.com/dRm6oIaJi36h8m84YB2cg03",
    variant: "secondary" as const,
  },
  {
    id: "pro",
    brand: "amplitude pro",
    title: "L'offre annuelle avec suivi",
    price: "249",
    period: "/an",
    compareAt: "498 €",
    discount: "-50 %",
    badge: "★ Recommandé",
    featured: true,
    features: [
      "Tout ce qu'il y a dans l'offre Amplitude",
      "3 mois de suivi bi-mensuel en live",
      "Tes questions répondues en direct",
      "Comprendre tes placements, te débloquer",
      "Démarrage à la rentrée (septembre)",
      "7 jours satisfait ou remboursé",
    ],
    cta: "Rejoindre Amplitude Pro",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE_PRO ??
      "https://buy.stripe.com/28E3cw18I0Y9fOAdv72cg04",
    variant: "primary" as const,
  },
  {
    id: "max",
    brand: "amplitude max",
    title: "L'offre fondateur, à vie !",
    price: "499",
    period: "",
    compareAt: "998 €",
    discount: "-50 %",
    badge: "à vie",
    features: [
      "Tout ce qu'il y a dans l'offre Amplitude Pro",
      "Accès à vie à l'application Amplitude",
      "Toutes les nouveautés, pour toujours",
      "3 visios individuelles de 30 min",
      "Bilan & placements personnalisés",
      "Places limitées – 20 membres",
      "-20 % sur les offres individuelles & workshops",
    ],
    cta: "Rejoindre Amplitude Max",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE_MAX ??
      "https://book.stripe.com/bJe4gA04E7mxdGsgHj2cg05",
    variant: "secondary" as const,
  },
];

const trustItems = [
  "7 jours satisfait ou remboursé",
  "Paiement sécurisé",
  "iOS & Android",
];


function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="min-h-0 space-y-2.5">
      {items.map((feature) => (
        <li
          key={feature}
          className="flex items-start gap-3 text-sm font-medium text-muted-light"
        >
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold"
            aria-hidden
          >
            ✓
          </span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function PricingCard({
  plan,
}: {
  plan: (typeof plans)[number];
}) {
  const isPrimary = plan.variant === "primary";

  return (
    <article
      className={`card-dark relative grid h-full min-h-full flex-1 grid-rows-[auto_minmax(0,1fr)_auto] p-6 sm:p-7 ${
        plan.featured ? "border-gold/40 ring-1 ring-gold/25" : ""
      }`}
    >
      {plan.badge ? (
        <span
          className={`absolute top-0 right-4 z-10 -translate-y-1/2 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
            plan.featured
              ? "bg-gold text-on-gold"
              : "border border-gold/30 bg-card text-gold"
          }`}
        >
          {plan.badge}
        </span>
      ) : null}

      <div>
        <p className="text-[11px] font-semibold tracking-[0.18em] text-gold">
          {plan.brand}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
          {plan.title}
        </h3>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-4xl font-semibold leading-none tracking-tighter sm:text-5xl">
            {plan.price}
          </span>
          <span className="pb-1 text-lg font-medium leading-none">€</span>
          {plan.period ? (
            <span className="pb-1 text-sm text-muted-light">{plan.period}</span>
          ) : null}
        </div>

        <p className="mt-2 text-sm text-muted-light">
          <span className="line-through">{plan.compareAt}</span>{" "}
          <span className="font-medium text-gold">{plan.discount}</span>
        </p>
      </div>

      <div className="mt-6 min-h-0">
        <FeatureList items={plan.features} />
      </div>

      <a
        href={plan.href}
        className={`mt-8 w-full self-end ${
          isPrimary ? "btn-primary" : "btn-secondary"
        }`}
        rel="noopener noreferrer"
      >
        {plan.cta}
      </a>
    </article>
  );
}

export function Pricing() {
  const countdown = useLaunchCountdown(LAUNCH_END);

  return (
    <section id="tarifs" className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="section-header">
            <p className="label-accent">
              Offre de lancement
            </p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Rejoins la communauté Amplitude
            </h2>
            <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
              À l&apos;occasion du lancement, l&apos;abonnement annuel est à
              -50&nbsp;%, avec deux formules inédites comprenant du coaching pour
              celles et ceux qui veulent aller plus loin (accessibles uniquement
              pendant la période de lancement).
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 max-w-xl rounded-2xl border border-gold/25 bg-gold-subtle px-5 py-5 text-left sm:mx-auto sm:mt-12 sm:px-6 sm:py-6 sm:text-center">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-light uppercase">
              L&apos;offre se termine dans
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-gold tabular-nums sm:text-3xl">
              {countdown.expired
                ? "Offre terminée"
                : `${countdown.days}j ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <div key={plan.id} className="flex min-h-0 flex-col">
              <Reveal delay={120 + index * 80} className="flex h-full flex-1 flex-col">
                <PricingCard plan={plan} />
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={360}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-light sm:mt-12">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-gold/15 text-[11px] font-bold text-gold"
                  aria-hidden
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
