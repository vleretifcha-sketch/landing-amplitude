import { Reveal } from "./Reveal";

const testimonialSources: Record<number, string> = {
  8: "Reçu sur WhatsApp",
  19: "Reçu sur WhatsApp",
  25: "Reçu sur Facebook",
  27: "Reçu sur WhatsApp",
};

const testimonialVideos: Record<number, string> = {
  3: "/videos/testimonials/testimonial-03.mp4",
  10: "/videos/testimonials/testimonial-10.mp4",
};

const testimonials = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;

  return {
    src: `/images/testimonials/testimonial-${String(number).padStart(2, "0")}.png`,
    videoSrc: testimonialVideos[number],
    alt: `Témoignage d'élève Amplitude ${number}`,
    source: testimonialSources[number] ?? "Reçu sur Instagram",
  };
});

export function TestimonialsSection() {
  return (
    <section
      id="temoignages"
      aria-label="Témoignages"
      className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl">
            <p className="label-accent">Résultats</p>
            <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:mt-6 sm:text-4xl lg:text-5xl">
              Ils m&apos;ont fait confiance
            </h2>
            <p className="mt-6 text-sm leading-[1.75] text-muted-light sm:mt-7 sm:text-base">
              +1 500 élèves ont atteint leurs objectifs de souplesse et de
              mobilité. Parce qu&apos;ils suivent la bonne méthode, avec constance et
              régularité.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 columns-1 gap-4 sm:mt-12 sm:columns-2 lg:mt-14 lg:columns-3 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.src} delay={40 + (index % 6) * 40}>
              <figure className="card-dark mb-4 break-inside-avoid overflow-hidden">
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span className="text-xs font-medium text-muted-light">
                    {testimonial.source}
                  </span>
                </div>
                {testimonial.videoSrc ? (
                  <video
                    src={testimonial.videoSrc}
                    poster={testimonial.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="block h-auto w-full bg-black"
                  />
                ) : (
                  <img
                    src={testimonial.src}
                    alt={testimonial.alt}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                )}
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
