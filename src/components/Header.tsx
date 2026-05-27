import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#process", label: "Comment ça marche" },
  { href: "#services", label: "La méthode" },
  { href: "#faq", label: "FAQ" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute top-0 left-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
          open ? "top-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute top-[7px] left-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute top-[14px] left-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
          open ? "top-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-5 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a
          href="#"
          className="animate-reveal-down cursor-pointer [animation-delay:0ms]"
          aria-label="Amplitude — accueil"
        >
          <Logo />
        </a>

        <nav
          className="nav-pill animate-reveal-down absolute top-5 left-1/2 hidden -translate-x-1/2 items-center gap-1 px-2 py-2 [animation-delay:520ms] lg:flex"
          aria-label="Navigation principale"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-full px-4 py-2 text-sm text-muted-light transition-colors duration-200 hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="animate-reveal-down flex items-center gap-2 [animation-delay:280ms] sm:gap-3">
          <button
            type="button"
            className="nav-pill flex h-12 w-12 cursor-pointer items-center justify-center text-text lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>

          <a href="#faq" className="btn-secondary shrink-0">
            Contact
          </a>
        </div>
      </div>

      <div
        id={menuId}
        className={`fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <nav
        className={`nav-pill fixed top-[5.25rem] right-4 left-4 z-50 flex flex-col gap-1 p-2 transition-all duration-300 sm:right-6 sm:left-6 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        aria-label="Navigation mobile"
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="cursor-pointer rounded-2xl px-4 py-3 text-sm text-muted-light transition-colors duration-200 hover:bg-white/5 hover:text-text"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
