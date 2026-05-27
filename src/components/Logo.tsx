export function Logo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <img
      src="/images/logo-amplitude.png"
      alt="Amplitude"
      className={`shrink-0 object-contain object-left ${className}`}
    />
  );
}
