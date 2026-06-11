import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const VIMEO_EMBED_SRC =
  "https://player.vimeo.com/video/1197986122?h=0b499f836d&title=0&byline=0&portrait=0";

export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="video"
      aria-label="Présentation vidéo"
      className="px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8 lg:pt-10 lg:pb-28"
    >
      <div ref={sectionRef} className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
            <div className="relative aspect-video w-full bg-black">
              {shouldLoad ? (
                <iframe
                  src={VIMEO_EMBED_SRC}
                  title="Présentation Amplitude"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                />
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
