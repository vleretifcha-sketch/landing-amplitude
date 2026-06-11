import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const navLinks = [
  { href: "#process", label: "Comment ça marche" },
  { href: "#services", label: "La méthode" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#video", label: "Vidéo" },
  { href: "#faq", label: "FAQ" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/",
    label: "TikTok",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.69h-3.45z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-bg px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <a href="#" aria-label="Amplitude — accueil">
                <Logo className="h-6 w-auto" />
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted-light">
                Une méthode premium de souplesse et mobilité créée à partir de
                plus de 10 années de pratique, d&apos;expérimentation et
                d&apos;enseignement, conçue pour progresser durablement, de la
                mobilité fonctionnelle jusqu&apos;au travail des écarts.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-border-light bg-card text-muted-light transition-colors duration-200 hover:border-white/40 hover:bg-card-hover hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <nav
              className="flex flex-col gap-3 sm:flex-row sm:gap-12"
              aria-label="Navigation pied de page"
            >
              <div>
                <p className="label-accent mb-4">Navigation</p>
                <ul className="space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-light transition-colors duration-200 hover:text-text"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-accent mb-4">Contact</p>
                <ul className="space-y-2.5">
                  <li>
                    <a
                      href="#faq"
                      className="text-sm text-muted-light transition-colors duration-200 hover:text-text"
                    >
                      Nous contacter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="btn-primary mt-1 inline-flex h-10 px-5 text-sm"
                    >
                      Accéder à l&apos;app
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </Reveal>

        <Reveal delay={150} className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted sm:text-left">
            © {new Date().getFullYear()} Amplitude. Tous droits réservés.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
