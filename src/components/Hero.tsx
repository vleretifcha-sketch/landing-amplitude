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

function heroMobileEnter(introReady: boolean, delay: number) {
  return introReady
    ? `max-lg:animate-reveal-up-blur max-lg:[animation-delay:${delay}ms]`
    : "max-lg:opacity-0";
}

function heroDesktopEnter(delay: number) {
  return `lg:animate-reveal-up-blur lg:[animation-delay:${delay}ms]`;
}

function HeroMobileVisual({ introReady }: { introReady: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden"
      aria-hidden
    >
      <img
        src="/images/hero-mobile-visual.png"
        alt=""
        className={`hero-mobile-visual absolute max-w-none select-none ${
          introReady
            ? "max-lg:animate-hero-mobile-visual-in"
            : "max-lg:opacity-0"
        }`}
      />
      <div
        className={`hero-mobile-scrim ${introReady ? "max-lg:animate-hero-mobile-scrim-in" : "max-lg:opacity-0"}`}
        aria-hidden
      />
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
          </div>
        </div>
        <div className="hero-phone-fade hero-phone-fade--desktop" aria-hidden />
      </div>
    </div>
  );
}

export function Hero({ introReady }: { introReady: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { parallax, progress } = useHeroParallax(trackRef);

  return (
    <>
      <section
        id="hero"
        className="relative inset-x-0 top-0 z-0 flex flex-col overflow-x-clip bg-bg px-4 pb-12 pt-24 sm:px-6 sm:pb-14 lg:fixed lg:min-h-dvh lg:h-dvh lg:overflow-hidden lg:px-8 lg:pb-0 lg:pt-28"
      >
        <HeroMobileVisual introReady={introReady} />

        <div
          className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col lg:h-full lg:min-h-0"
          style={parallaxStyle(parallax)}
        >
          <div className="relative flex flex-col lg:min-h-0 lg:flex-1">
            <HeroPhoneDesktop side="left" progress={progress} />
            <HeroPhoneDesktop side="right" progress={progress} />

            <div className="hero-bottom-fade hidden lg:block" aria-hidden />

            <div className="relative z-20 flex flex-col pt-[38vh] lg:flex-1 lg:items-center lg:justify-center lg:pt-0">
              <div className="flex w-full max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
                <span
                  className={`label-accent mb-4 lg:mb-5 ${heroMobileEnter(introReady, 120)} ${heroDesktopEnter(350)}`}
                >
                  Nouveauté
                </span>

                <h1 className="text-balance text-[2.25rem] font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.5rem] lg:leading-[1.05]">
                  <span
                    className={`block ${heroMobileEnter(introReady, 240)} ${heroDesktopEnter(550)}`}
                  >
                    La souplesse
                  </span>
                  <span
                    className={`text-gold-gradient block ${heroMobileEnter(introReady, 380)} ${heroDesktopEnter(900)}`}
                  >
                    à portée de main.
                  </span>
                </h1>

                <p
                  className={`mt-5 max-w-lg text-pretty text-sm leading-relaxed text-muted-light sm:mt-6 sm:text-base lg:text-lg ${heroMobileEnter(introReady, 520)} ${heroDesktopEnter(1250)}`}
                >
                  Découvre Amplitude&nbsp;: une application 100&nbsp;% mobile et
                  100&nbsp;% progression, structurée avec la rigueur d&apos;un programme
                  fitness pour atteindre tous tes objectifs de souplesse et mobilité.
                </p>

                <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 lg:w-auto lg:flex-row lg:justify-center">
                  <a
                    href="#services"
                    className={`btn-primary w-full lg:w-auto ${heroMobileEnter(introReady, 660)} ${heroDesktopEnter(1650)}`}
                  >
                    Rejoindre Amplitude
                  </a>
                  <a
                    href="#services"
                    className={`btn-secondary w-full lg:w-auto ${heroMobileEnter(introReady, 780)} ${heroDesktopEnter(2050)}`}
                  >
                    En savoir plus
                  </a>
                </div>

                <div
                  className={`mt-8 sm:mt-10 ${heroMobileEnter(introReady, 900)} ${heroDesktopEnter(2350)}`}
                >
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
