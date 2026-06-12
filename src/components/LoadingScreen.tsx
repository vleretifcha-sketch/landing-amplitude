import { useEffect, useRef, useState } from "react";

const LOAD_DURATION_MS = 1500;
const SHUTTER_DURATION_MS = 900;

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function unlockScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

type Phase = "loading" | "opening" | "done";

type LoadingScreenProps = {
  onComplete?: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const ringRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const leftShutterRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("loading");
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  phaseRef.current = phase;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;
    finishedRef.current = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.body.style.overflow = "hidden";

    const finish = () => {
      if (cancelled || finishedRef.current) return;
      finishedRef.current = true;
      setPhase("done");
      unlockScroll();
      onCompleteRef.current?.();
    };

    const startOpening = () => {
      if (cancelled) return;

      if (prefersReducedMotion) {
        finish();
        return;
      }

      const left = leftShutterRef.current;
      if (left) {
        left.getBoundingClientRect();
        requestAnimationFrame(() => {
          if (!cancelled) setPhase("opening");
        });
      } else {
        setPhase("opening");
      }
    };

    const start = performance.now();
    let raf = 0;
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    const safetyTimer = setTimeout(
      finish,
      LOAD_DURATION_MS + SHUTTER_DURATION_MS + 400,
    );

    const tick = (now: number) => {
      if (cancelled) return;

      const elapsed = now - start;
      const linear = Math.min(1, elapsed / LOAD_DURATION_MS);
      const eased = easeOutCubic(linear);

      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(
          RING_CIRCUMFERENCE * (1 - eased),
        );
      }
      if (labelRef.current) {
        labelRef.current.textContent = String(Math.round(eased * 100));
      }

      if (elapsed < LOAD_DURATION_MS) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (ringRef.current) ringRef.current.style.strokeDashoffset = "0";
      if (labelRef.current) labelRef.current.textContent = "100";

      openTimer = setTimeout(() => {
        startOpening();
        finishTimer = setTimeout(finish, SHUTTER_DURATION_MS + 120);
      }, 80);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
      clearTimeout(safetyTimer);
      unlockScroll();
    };
  }, []);

  const handleShutterEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "transform") return;
    if (phaseRef.current !== "opening") return;
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("done");
    unlockScroll();
    onCompleteRef.current?.();
  };

  if (phase === "done") return null;

  const isOpening = phase === "opening";

  return (
    <div
      className={`fixed inset-0 z-[200] ${isOpening ? "pointer-events-none" : "pointer-events-auto"}`}
      aria-hidden={isOpening}
      aria-live="polite"
      aria-busy={!isOpening}
    >
      <div
        ref={leftShutterRef}
        onTransitionEnd={handleShutterEnd}
        className={`absolute top-0 left-0 z-20 h-full w-1/2 origin-left bg-bg transition-transform will-change-transform ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionDuration: `${SHUTTER_DURATION_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      <div
        className={`absolute top-0 right-0 z-20 h-full w-1/2 origin-right bg-bg transition-transform will-change-transform ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          transitionDuration: `${SHUTTER_DURATION_MS}ms`,
          transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 transition-opacity duration-300 ease-out ${
          isOpening ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg
            className="h-20 w-20 -rotate-90"
            viewBox="0 0 80 80"
            aria-hidden
          >
            <circle
              cx="40"
              cy="40"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold/20"
            />
            <circle
              ref={ringRef}
              cx="40"
              cy="40"
              r={RING_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-gold"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE}
            />
          </svg>
          <span
            ref={labelRef}
            className="absolute text-lg font-medium tabular-nums text-text"
          >
            0
          </span>
        </div>

        <p className="text-xs font-medium tracking-[0.2em] text-muted-light uppercase">
          Chargement
        </p>
      </div>
    </div>
  );
}
