import { Logo } from "../components/Logo";

const features = [
  "Programme mensuel",
  "Cours signature",
  "Vidéos explicatives",
  "Warm up mobilité active",
  "Communauté privée",
];

const stripePaymentLink =
  import.meta.env.VITE_STRIPE_PAYMENT_LINK ??
  "https://buy.stripe.com/14A3cweZy9uFgSE0Il2cg07";

export function SubscribePage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-bg px-4 py-8 sm:px-6 sm:py-12">
      <header className="mx-auto w-full max-w-lg">
        <Logo className="h-7 w-auto" />
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10 sm:py-14">
        <article className="card-dark p-6 sm:p-8">
          <p className="label-accent">Abonnement</p>

          <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
            Finaliser votre abonnement
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-muted-light sm:text-base">
            Vous allez accéder au paiement sécurisé Stripe pour souscrire à
            l&apos;abonnement Amplitude. Une fois le paiement confirmé, vous
            pourrez accéder à l&apos;application et commencer votre programme.
          </p>

          <div className="mt-8 flex items-end gap-3 border-t border-border pt-8">
            <span className="text-5xl font-semibold leading-none tracking-tighter sm:text-6xl">
              39
            </span>
            <div className="pb-1">
              <span className="block text-xl font-medium leading-none">€</span>
              <span className="mt-1 block text-sm text-muted-light">par mois</span>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm font-medium text-muted-light"
              >
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

          <a
            href={stripePaymentLink}
            className="btn-primary mt-8 w-full"
            rel="noopener noreferrer"
          >
            Continuer vers le paiement
          </a>

          <p className="mt-4 text-center text-xs text-muted">
            Paiement sécurisé par Stripe · Renouvellement mensuel · Résiliation à
            tout moment
          </p>
        </article>
      </main>
    </div>
  );
}
