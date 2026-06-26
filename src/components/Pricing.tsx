import { Reveal } from "./Reveal";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";
import { LAUNCH_END } from "../lib/launch";

type PlanId = "amplitude" | "pro" | "max";

const plans = [
  {
    id: "amplitude" as const,
    brand: "amplitude",
    title: "L'offre annuelle",
    price: "149",
    period: "/an",
    compareAt: "298 €",
    discount: "-50 %",
    cta: "Rejoindre Amplitude",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE ??
      "https://buy.stripe.com/dRm6oIaJi36h8m84YB2cg03",
    variant: "secondary" as const,
  },
  {
    id: "pro" as const,
    brand: "amplitude pro",
    title: "L'offre annuelle avec suivi",
    price: "249",
    period: "/an",
    compareAt: "498 €",
    discount: "-50 %",
    badge: "★ Recommandé",
    featured: true,
    cta: "Rejoindre Amplitude Pro",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE_PRO ??
      "https://buy.stripe.com/28E3cw18I0Y9fOAdv72cg04",
    variant: "primary" as const,
  },
  {
    id: "max" as const,
    brand: "amplitude max",
    title: "L'offre fondateur, à vie !",
    price: "499",
    period: "paiement unique",
    compareAt: "998 €",
    discount: "-50 %",
    badge: "à vie",
    cta: "Rejoindre Amplitude Max",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE_MAX ??
      "https://book.stripe.com/bJe4gA04E7mxdGsgHj2cg05",
    variant: "secondary" as const,
  },
];

const comparisonFeatures: {
  label: string;
  included: Record<PlanId, boolean>;
}[] = [
  {
    label: "Accès annuel à l'application mobile (iOS et Android)",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Tous les cours et programmes signatures",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Nouvelles vidéos chaque mois",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Routines de pré-training et de récupération",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Espace conseils hebdomadaire",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Outil de mesure photo",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Connexion Apple Santé",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Statistiques et calendrier d'entraînement personnalisé",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "Communauté privée",
    included: { amplitude: true, pro: true, max: true },
  },
  {
    label: "3 mois de suivi bi-mensuel en live (à partir de septembre)",
    included: { amplitude: false, pro: true, max: true },
  },
  {
    label: "Accès à vie à l'application mobile (iOS et Android)",
    included: { amplitude: false, pro: false, max: true },
  },
  {
    label: "3 visios individuelles de 30 min (à partir de septembre)",
    included: { amplitude: false, pro: false, max: true },
  },
  {
    label: "-20 % sur les offres individuelles & workshops",
    included: { amplitude: false, pro: false, max: true },
  },
];

const trustItems = [
  "7 jours satisfait ou remboursé",
  "Paiement sécurisé",
  "iOS & Android",
];


function FeatureList({ planId }: { planId: PlanId }) {
  return (
    <ul className="min-h-0 space-y-2.5">
      {comparisonFeatures.map((feature) => {
        const included = feature.included[planId];

        return (
          <li
            key={feature.label}
            className={`flex items-start gap-3 text-sm font-medium ${
              included ? "text-muted-light" : "text-muted"
            }`}
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                included
                  ? "bg-gold/15 text-gold"
                  : "bg-surface-inset text-muted"
              }`}
              aria-hidden
            >
              {included ? "✓" : "✕"}
            </span>
            <span className={included ? "" : "opacity-70"}>{feature.label}</span>
          </li>
        );
      })}
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
        plan.featured
          ? "border-gold/55 bg-gradient-to-b from-gold-subtle via-card to-card shadow-[0_0_0_1px_rgba(238,220,154,0.28),0_20px_56px_-16px_rgba(238,220,154,0.38)]"
          : ""
      }`}
    >
      {plan.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
        />
      ) : null}

      {plan.badge ? (
        <span
          className={`absolute top-0 right-4 z-10 -translate-y-1/2 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
            plan.featured
              ? "bg-gold text-on-gold shadow-[0_4px_18px_rgba(238,220,154,0.45)]"
              : "border border-gold/30 bg-card text-gold"
          }`}
        >
          {plan.badge}
        </span>
      ) : null}

      <div>
        <p className="label-accent">{plan.brand}</p>
        <h3 className="mt-4 text-lg font-semibold tracking-tight sm:text-xl">
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
        <FeatureList planId={plan.id} />
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
              -50&nbsp;% jusqu&apos;au 31 juillet 2026, avec deux formules inédites comprenant du suivi pour
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

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-gold/15 pt-5">
              <p className="text-sm text-muted-light">
                Code à indiquer pour -50&nbsp;% :
              </p>
              <span className="rounded-lg border border-dashed border-gold/60 bg-bg px-4 py-1.5 text-sm font-bold tracking-[0.12em] text-gold">
                LANCEMENT
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-6 overflow-visible px-1 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)_minmax(0,1fr)] lg:items-center lg:gap-5">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`flex min-h-0 flex-col ${
                plan.featured ? "lg:-translate-y-5 lg:z-10 lg:scale-[1.04]" : ""
              }`}
            >
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
