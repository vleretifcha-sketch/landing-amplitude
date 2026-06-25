import { useEffect, useState } from "react";

const DESKTOP_BREAKPOINT = 1024;

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      let pastHero = false;

      if (isDesktop) {
        const sentinel = document.getElementById("hero-sentinel");
        pastHero = sentinel ? sentinel.getBoundingClientRect().top < 0 : false;
      } else {
        const hero = document.getElementById("hero");
        pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : false;
      }

      const faq = document.getElementById("faq");
      const faqInView = faq
        ? faq.getBoundingClientRect().top < window.innerHeight
        : false;

      setVisible(pastHero && !faqInView);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-[55] border-t border-border bg-bg/95 px-4 py-3 backdrop-blur-xl transition-transform duration-300 ease-out sm:px-6 ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 pb-[max(0px,env(safe-area-inset-bottom))] sm:justify-between sm:gap-6">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="text-sm font-semibold leading-snug sm:text-base">
            Rejoins la communauté Amplitude
          </p>
          <p className="mt-0.5 text-xs leading-snug text-muted-light sm:text-sm">
            Offre de lancement · -50&nbsp;% sur l&apos;abonnement annuel
          </p>
        </div>

        <a
          href="#tarifs"
          tabIndex={visible ? 0 : -1}
          className="btn-primary h-11 w-full max-w-sm shrink-0 px-5 sm:w-auto sm:max-w-none sm:px-6"
        >
          Rejoindre Amplitude
        </a>
      </div>
    </div>
  );
}
