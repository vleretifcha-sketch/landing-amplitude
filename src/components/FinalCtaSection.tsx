import { Reveal } from "./Reveal";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";
import { LAUNCH_END } from "../lib/launch";

export function FinalCtaSection() {
  const countdown = useLaunchCountdown(LAUNCH_END);

  return (
    <section
      aria-label="Rejoindre Amplitude"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Prêt(e) à atteindre tous tes objectifs de souplesse et de mobilité
            ?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
            L&apos;offre de lancement court jusqu&apos;au{" "}
            <span className="font-semibold text-text">31 juillet à minuit</span>
            , et les places Fondateur sont limitées.
          </p>
          <a
            href="#tarifs"
            className="btn-primary mt-8 flex w-full justify-center sm:mt-10 lg:inline-flex lg:w-auto lg:px-10"
          >
            Je rejoins Amplitude
          </a>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold-subtle px-5 py-2.5 sm:mt-7">
            <span className="text-xs font-semibold text-muted-light uppercase">
              Il reste
            </span>
            <span className="text-sm font-semibold tabular-nums text-gold sm:text-base">
              {countdown.expired
                ? "Offre terminée"
                : `${countdown.days}j ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
