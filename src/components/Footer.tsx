import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo className="h-5 w-auto sm:h-6" />
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} — Souplesse & mobilité. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
