const avatars = [
  {
    src: "/images/avatars/avatar-1.png",
    alt: "Membre Amplitude",
  },
  {
    src: "/images/avatars/avatar-2.png",
    alt: "Membre Amplitude",
  },
  {
    src: "/images/avatars/avatar-3.png",
    alt: "Membre Amplitude",
  },
];

export function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
      <div className="flex -space-x-2.5">
        {avatars.map((avatar, index) => (
          <div
            key={avatar.src}
            className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-bg shadow-md sm:h-10 sm:w-10"
            style={{ zIndex: index + 1 }}
          >
            <img
              src={avatar.src}
              alt={avatar.alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
      <p className="text-sm leading-snug text-muted-light">
        <span className="font-medium text-text">+1000 élèves</span> accompagnés
      </p>
    </div>
  );
}
