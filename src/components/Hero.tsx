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

function HeroMobileVisual() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden"
      aria-hidden
    >
      <img
        src="/images/hero-mobile-visual.png"
        alt=""
        className="hero-mobile-visual absolute max-w-none select-none"
      />
      <div className="hero-mobile-scrim" aria-hidden />
    </div>
  );
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
          ? "left-0 -translate-x-[4%] rotate-[-10deg] xl:left-4"
          : "right-0 translate-x-[4%] rotate-[10deg] xl:right-4"
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
              src={
                isLeft
                  ? "/images/hero-phone-left.png"
                  : "/images/hero-phone-right.png"
              }
              alt=""
              className={`block max-w-none select-none ${
                isLeft
                  ? "w-[400px] xl:w-[460px]"
                  : "w-[400px] xl:w-[460px]"
              }`}
            />
            <div className="hero-phone-fade" aria-hidden />
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
      <section
        id="hero"
        className="relative inset-x-0 top-0 z-0 flex min-h-dvh flex-col overflow-x-clip bg-bg px-4 pb-8 pt-24 sm:px-6 sm:pb-10 lg:fixed lg:h-dvh lg:overflow-hidden lg:px-8 lg:pb-0 lg:pt-28"
      >
        <HeroMobileVisual />

        <div
          className="relative mx-auto flex h-full min-h-[calc(100dvh-6rem)] w-full max-w-7xl flex-1 flex-col lg:min-h-0"
          style={parallaxStyle(parallax)}
        >
          <div className="relative flex min-h-0 flex-1 flex-col">
            <HeroPhoneDesktop side="left" progress={progress} />
            <HeroPhoneDesktop side="right" progress={progress} />

            <div className="hero-bottom-fade" aria-hidden />

            <div className="relative z-20 flex flex-1 flex-col justify-end lg:items-center lg:justify-center">
              <div className="flex w-full max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
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
                  Découvre Amplitude&nbsp;: une application 100&nbsp;% mobile et
                  100&nbsp;% progression, structurée avec la rigueur d&apos;un programme
                  fitness pour atteindre tous tes objectifs de souplesse et mobilité.
                </p>

                <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 lg:w-auto lg:flex-row lg:justify-center">
                  <a
                    href="#services"
                    className="btn-primary animate-reveal-up-blur w-full [animation-delay:1650ms] lg:w-auto"
                  >
                    Rejoindre Amplitude
                  </a>
                  <a
                    href="#services"
                    className="btn-secondary animate-reveal-up-blur w-full [animation-delay:2050ms] lg:w-auto"
                  >
                    En savoir plus
                  </a>
                </div>

                <div className="animate-reveal-up-blur mt-8 [animation-delay:2350ms] sm:mt-10">
                  <SocialProof />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Espace de scroll : 1 écran puis phase parallax avant la vidéo */}
      <div className="hidden h-dvh lg:block" aria-hidden />
      <div
        id="hero-sentinel"
        ref={trackRef}
        className="hidden lg:block"
        style={{ height: `${PARALLAX_SCROLL_VH}vh` }}
        aria-hidden
      />
    </>
  );
}
