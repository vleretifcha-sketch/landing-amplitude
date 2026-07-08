import { useState } from "react";
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
    launchOnly: true,
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
    launchOnly: true,
    cta: "Rejoindre Amplitude Max",
    href:
      import.meta.env.VITE_STRIPE_LINK_AMPLITUDE_MAX ??
      "https://buy.stripe.com/bJe9AU04E5ep31Odv72cg06",
    variant: "secondary" as const,
  },
];

const comparisonFeatures: {
  label: string;
  included: Record<PlanId, boolean>;
}[] = [
  {
    label: "Accès annuel à l'application mobile (iOS)",
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
    label: "Accès à vie à l'application mobile (iOS)",
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
  "iOS",
];

const PROMO_CODE = "LANCEMENT";

function PromoCodeCopy() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="rounded-lg border border-dashed border-gold/60 bg-bg px-4 py-1.5 text-sm font-bold tracking-[0.12em] text-gold">
        {PROMO_CODE}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Code copié" : "Copier le code promo"}
        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gold/30 bg-bg text-gold transition-colors duration-200 hover:border-gold/50 hover:bg-gold-subtle"
      >
        {copied ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}


function FeatureList({ planId }: { planId: PlanId }) {
  return (
    <ul className="min-h-0 space-y-2.5">
      {comparisonFeatures.map((feature) => {
        const included = feature.included[planId];
        const isMaxExclusive =
          feature.included.max &&
          !feature.included.pro &&
          !feature.included.amplitude;

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
              {included ? (isMaxExclusive ? "★" : "✓") : "✕"}
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
      className={`card-dark relative flex flex-col p-6 sm:p-7 lg:h-full lg:min-h-full ${
        plan.featured
          ? "border-gold/55 bg-gradient-to-b from-gold-subtle via-card to-card shadow-[0_0_0_1px_rgba(227,211,164,0.28),0_20px_56px_-16px_rgba(227,211,164,0.38)]"
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
              ? "bg-gold text-on-gold shadow-[0_4px_18px_rgba(227,211,164,0.45)]"
              : "border border-gold/30 bg-card text-gold"
          }`}
        >
          {plan.badge}
        </span>
      ) : null}

      <div className="shrink-0">
        <p className="label-accent">{plan.brand}</p>
        <h3 className="mt-3 text-lg font-semibold tracking-tight sm:mt-4 sm:text-xl lg:min-h-[3rem]">
          {plan.title}
        </h3>

        {plan.launchOnly ? (
          <p className="mt-3 inline-flex items-center rounded-full border border-gold/35 bg-gold-subtle px-3 py-1 text-[11px] font-semibold tracking-wide text-gold uppercase">
            Uniquement pendant le lancement
          </p>
        ) : (
          <div className="hidden h-[1.75rem] lg:block" aria-hidden />
        )}

        <div className="mt-3 flex items-end gap-2 sm:mt-4">
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

      <div className="mt-6 flex-1 min-h-0">
        <FeatureList planId={plan.id} />
      </div>

      <a
        href={plan.href}
        className={`mt-8 w-full ${
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
              À l&apos;occasion du lancement, l&apos;abonnement annuel Amplitude est à
              -50&nbsp;% jusqu&apos;au 31 juillet 2026.{" "}
              <span className="font-medium text-text">
                Amplitude Pro et Amplitude Max ne seront disponibles que pendant
                cette période
              </span>{" "}
              ; deux formules inédites avec suivi pour celles et ceux qui veulent
              aller plus loin.
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
              <PromoCodeCopy />
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-light">
              <span className="font-semibold text-gold">
                Amplitude Pro & Amplitude Max
              </span>{" "}
              : offres exclusives au lancement, non disponibles après le 31 juillet.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 px-1 lg:mt-16 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {plans.map((plan, index) => (
            <div key={plan.id} className="flex min-h-0 flex-col lg:h-full">
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
