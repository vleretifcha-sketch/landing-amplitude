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
const DESKTOP_BREAKPOINT = 1024;
const MOBILE_REVEAL_DISTANCE = 140;

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
      const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;

      if (isMobile) {
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

function useMobilePhonesReveal() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setProgress(0);
        return;
      }

      const maxScroll = Math.max(1, window.innerHeight * 0.42);
      const next = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      setProgress(next);
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
  }, []);

  return progress;
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
      className={`pointer-events-none absolute top-1/2 z-0 hidden -translate-y-[42%] lg:block ${
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
            <div className="hero-phone-fade" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPhoneMobile({ revealProgress }: { revealProgress: number }) {
  const translateY = (1 - revealProgress) * MOBILE_REVEAL_DISTANCE;
  const revealStyle: CSSProperties = {
    transform: `translate3d(0, ${translateY}px, 0)`,
    opacity: 0.25 + revealProgress * 0.75,
    willChange: "transform, opacity",
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-0 flex w-full justify-center lg:hidden"
    >
      <div
        className="relative -mb-16 w-[min(calc(100vw-2rem),520px)] max-w-full"
        style={revealStyle}
      >
        <img
          src="/images/hero-phones-mobile.png"
          alt=""
          className="block w-full max-w-none select-none"
        />
        <div className="hero-phone-fade hero-phone-fade--mobile" aria-hidden />
      </div>
    </div>
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { parallax, progress } = useHeroParallax(trackRef);
  const mobilePhonesReveal = useMobilePhonesReveal();

  return (
    <>
      <section className="relative inset-x-0 top-0 z-0 flex min-h-dvh flex-col overflow-hidden bg-bg px-4 pt-44 sm:px-6 sm:pt-36 lg:fixed lg:h-dvh lg:px-8 lg:pt-28">
        <div
          className="relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col"
          style={parallaxStyle(parallax)}
        >
          <div className="relative flex min-h-0 flex-1 flex-col">
            <HeroPhoneDesktop side="left" progress={progress} />
            <HeroPhoneDesktop side="right" progress={progress} />

            <div className="hero-bottom-fade" aria-hidden />

            <div className="relative z-20 flex flex-1 flex-col lg:items-center lg:justify-center">
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="label-accent animate-reveal-up-blur mb-5 [animation-delay:350ms]">
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

                <p className="animate-reveal-up-blur mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-light [animation-delay:1250ms] sm:text-lg">
                  Une méthode premium de souplesse et de mobilité, créée à partir de
                  plus de 10 années de pratique et d&apos;enseignement. Que votre
                  objectif soit d&apos;améliorer votre mobilité pour mieux performer
                  dans votre sport ou d&apos;atteindre des objectifs de souplesse comme
                  le grand&nbsp;écart.
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
            </div>

            <div className="relative z-0 mt-10 flex justify-center sm:mt-12 lg:hidden">
              <HeroPhoneMobile revealProgress={mobilePhonesReveal} />
            </div>
          </div>
        </div>
      </section>

      {/* Espace de scroll : 1 écran puis phase parallax avant la vidéo */}
      <div className="hidden h-dvh lg:block" aria-hidden />
      <div
        ref={trackRef}
        className="hidden lg:block"
        style={{ height: `${PARALLAX_SCROLL_VH}vh` }}
        aria-hidden
      />
    </>
  );
}
