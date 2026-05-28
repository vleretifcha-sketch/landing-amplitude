import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { SocialProof } from "./SocialProof";

type HeroParallax = {
  opacity: number;
  scale: number;
  translateZ: number;
  blur: number;
  brightness: number;
};

const PARALLAX_SCROLL_VH = 32;

function useHeroParallax(trackRef: RefObject<HTMLDivElement | null>) {
  const [parallax, setParallax] = useState<HeroParallax>({
    opacity: 1,
    scale: 1,
    translateZ: 0,
    blur: 0,
    brightness: 1,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;

    const update = () => {
      if (prefersReducedMotion) {
        setParallax({
          opacity: 1,
          scale: 1,
          translateZ: 0,
          blur: 0,
          brightness: 1,
        });
        setProgress(0);
        return;
      }

      const rect = track.getBoundingClientRect();
      const range = track.offsetHeight;
      const scrollProgress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / Math.max(1, range)),
      );

      setProgress(scrollProgress);
      setParallax({
        opacity: 1 - scrollProgress * 0.95,
        scale: 1 - scrollProgress * 0.14,
        translateZ: -scrollProgress * 360,
        blur: scrollProgress * 16,
        brightness: 1 - scrollProgress * 0.45,
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackRef]);

  return { parallax, progress };
}

function phoneScrollStyle(progress: number): CSSProperties {
  return {
    transform: `translateY(${-progress * 140}px)`,
    willChange: "transform",
  };
}

function parallaxStyle(parallax: HeroParallax): CSSProperties {
  return {
    opacity: parallax.opacity,
    transform: `perspective(900px) translate3d(0, 0, ${parallax.translateZ}px) scale(${parallax.scale})`,
    filter: `blur(${parallax.blur}px) brightness(${parallax.brightness})`,
    transformOrigin: "50% 50%",
    transformStyle: "preserve-3d",
    willChange: "transform, opacity, filter",
  };
}

function HeroPhoneDesktop({
  side,
  progress,
}: {
  side: "left" | "right";
  progress: number;
}) {
  const isLeft = side === "left";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-[42%] lg:block ${
        isLeft
          ? "left-0 -translate-x-[8%] rotate-[-12deg] xl:left-2"
          : "right-0 translate-x-[8%] rotate-[12deg] xl:right-2"
      }`}
    >
      <div className="relative" style={phoneScrollStyle(progress)}>
        <div
          className={`animate-reveal-up-blur relative ${isLeft ? "[animation-delay:2600ms]" : "[animation-delay:2850ms]"}`}
        >
          <div
            className={`relative ${isLeft ? "animate-phone-float [animation-delay:3.2s]" : "animate-phone-float-slow [animation-delay:3.6s]"}`}
          >
            <img
              src="/images/phone-mockup.png"
              alt=""
              className={`block w-[480px] max-w-none select-none xl:w-[560px] ${
                isLeft ? "" : "scale-x-[-1]"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg from-25% via-bg/70 via-55% to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPhoneMobile({ progress }: { progress: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-0 flex w-full justify-center lg:hidden"
    >
      <div className="relative" style={phoneScrollStyle(progress)}>
        <div className="animate-reveal-up-blur relative -mb-20 [animation-delay:2450ms] sm:-mb-24">
          <div className="animate-phone-float relative [animation-delay:3s]">
            <img
              src="/images/phone-mockup.png"
              alt=""
              className="block w-[min(92vw,380px)] max-w-none select-none sm:w-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg from-20% via-bg/70 via-50% to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { parallax, progress } = useHeroParallax(trackRef);

  return (
    <>
      <section className="fixed inset-x-0 top-0 z-0 flex h-dvh flex-col overflow-hidden bg-bg px-4 pt-28 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col"
          style={parallaxStyle(parallax)}
        >
          <div className="relative flex min-h-0 flex-1 flex-col">
            <HeroPhoneDesktop side="left" progress={progress} />
            <HeroPhoneDesktop side="right" progress={progress} />

            <div className="relative z-10 flex flex-1 flex-col lg:items-center lg:justify-center">
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="animate-reveal-up-blur mb-5 inline-flex items-center rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-xs font-medium tracking-wide text-gold [animation-delay:350ms]">
                  Nouveauté
                </span>

                <h1 className="text-balance text-5xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                  <span className="animate-reveal-up-blur block [animation-delay:550ms]">
                    La souplesse
                  </span>
                  <span className="animate-reveal-up-blur text-gold-gradient block [animation-delay:900ms]">
                    à portée de main.
                  </span>
                </h1>

                <p className="animate-reveal-up-blur mt-6 max-w-lg text-base leading-relaxed text-muted-light [animation-delay:1250ms] sm:text-lg">
                  Une méthode premium de souplesse et mobilité pensée comme un
                  entraînement — structurée, progressive et compatible avec une vie
                  normale.
                </p>

                <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center">
                  <a
                    href="#services"
                    className="btn-primary animate-reveal-up-blur w-full [animation-delay:1650ms] sm:w-auto"
                  >
                    Accéder à l&apos;app
                  </a>
                  <a
                    href="#services"
                    className="btn-secondary animate-reveal-up-blur w-full [animation-delay:2050ms] sm:w-auto"
                  >
                    En savoir plus
                  </a>
                </div>

                <div className="animate-reveal-up-blur mt-8 [animation-delay:2350ms] sm:mt-10">
                  <SocialProof />
                </div>
              </div>

              <div className="mt-8 flex justify-center sm:mt-10 lg:hidden">
                <HeroPhoneMobile progress={progress} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Espace de scroll : 1 écran puis phase parallax avant la vidéo */}
      <div className="h-dvh" aria-hidden />
      <div
        ref={trackRef}
        style={{ height: `${PARALLAX_SCROLL_VH}vh` }}
        aria-hidden
      />
    </>
  );
}
