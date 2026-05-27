import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/amplitude.mp4";
const PLACEHOLDER_SRC = "/images/video-placeholder.png";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoReady]);

  return (
    <section
      id="video"
      aria-label="Présentation vidéo"
      className="px-4 pt-6 pb-16 sm:px-6 sm:pt-8 sm:pb-20 lg:px-8 lg:pt-10 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_0_80px_-20px_rgba(212,175,55,0.15)]">
          <div className="relative aspect-video w-full">
            <img
              src={PLACEHOLDER_SRC}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden
            />
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={PLACEHOLDER_SRC}
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent"
              aria-hidden
            />
          </div>
        </div>
        <p className="sr-only">
          Vidéo de présentation de la méthode Amplitude. Placez le fichier MP4
          dans public/videos/amplitude.mp4.
        </p>
      </div>
    </section>
  );
}
