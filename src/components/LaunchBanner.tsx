import { useLaunchCountdown } from "../hooks/useLaunchCountdown";
import { LAUNCH_END } from "../lib/launch";

export function LaunchBanner() {
  const countdown = useLaunchCountdown(LAUNCH_END);

  const timerLabel = countdown.expired
    ? "Offre terminée"
    : `${countdown.days}j ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;

  return (
    <div className="relative z-[2] bg-gold px-4 py-2.5 text-on-gold sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <p className="text-xs leading-snug font-medium sm:text-sm">
          <span aria-hidden className="mr-1.5">
            •
          </span>
          <span className="font-semibold tracking-wide">LANCEMENT</span>
          <span className="ml-2 hidden sm:inline">
            Offre annuelle -50&nbsp;% &amp; deux formules inédites ; jusqu&apos;au
            31 juillet, minuit
          </span>
          <span className="ml-2 sm:hidden">Offre annuelle -50&nbsp;%</span>
        </p>

        <span className="shrink-0 rounded-full bg-bg px-3 py-1 text-xs font-semibold whitespace-nowrap text-text tabular-nums">
          {timerLabel}
        </span>
      </div>
    </div>
  );
}
