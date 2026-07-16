import { useEffect, useState } from "react";
import { LegalBlocks } from "../components/legal/LegalBlocks";
import { LegalLayout } from "../components/legal/LegalLayout";
import { getLegalRouteKey } from "../lib/legalRoutes";
import { parseLegalText, type LegalDocumentMeta } from "../lib/parseLegalText";

const documents: Record<string, LegalDocumentMeta> = {
  cgu: {
    file: "/legal/cgu.txt",
    title: "Conditions Générales d'Utilisation (CGU)",
    subtitle: "Application Amplitude ; Version applicable à compter du mardi 30 juin 2026",
  },
  cgv: {
    file: "/legal/cgv.txt",
    title: "Conditions Générales de Vente (CGV)",
    subtitle: "Application Amplitude ; Version applicable à compter du mardi 30 juin 2026",
  },
  privacy: {
    file: "/legal/politique-de-confidentialite.txt",
    title: "Politique de confidentialité",
    subtitle: "Application Amplitude ; Version applicable à compter du mardi 30 juin 2026",
  },
  legalNotice: {
    file: "/legal/mentions-legales.txt",
    title: "Mentions légales",
    subtitle: "Site internet et application Amplitude",
  },
  accountDeletion: {
    file: "/legal/politique-suppression-compte.txt",
    title: "Politique de suppression de compte",
    subtitle: "Application Amplitude",
  },
  community: {
    file: "/legal/charte-communaute.txt",
    title: "Charte de la communauté Amplitude",
    subtitle: "Bienvenue dans la communauté Amplitude",
  },
  cookies: {
    file: "/legal/politique-cookies.txt",
    title: "Politique de cookies",
    subtitle: "Application Amplitude & Site internet www.amplitudeapp.fr ; Version applicable à compter du mardi 30 juin 2026",
  },
};

export function LegalDocumentPage({ path }: { path: string }) {
  const key = getLegalRouteKey(path);
  const meta = key ? documents[key] : null;
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!meta) return;

    let cancelled = false;

    fetch(meta.file)
      .then((response) => {
        if (!response.ok) throw new Error("not found");
        return response.text();
      })
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [meta]);

  if (!meta) {
    return (
      <LegalLayout title="Document introuvable">
        <p className="text-sm text-muted-light">
          Ce document n&apos;existe pas.
        </p>
      </LegalLayout>
    );
  }

  if (error) {
    return (
      <LegalLayout title={meta.title} subtitle={meta.subtitle}>
        <p className="text-sm text-muted-light">
          Impossible de charger ce document pour le moment.
        </p>
      </LegalLayout>
    );
  }

  if (!content) {
    return (
      <LegalLayout title={meta.title} subtitle={meta.subtitle}>
        <p className="text-sm text-muted-light">Chargement…</p>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title={meta.title} subtitle={meta.subtitle}>
      <LegalBlocks blocks={parseLegalText(content)} />
      {key === "accountDeletion" ? (
        <div className="surface-inset mt-8 rounded-2xl p-5 sm:p-6">
          <p className="text-sm font-medium text-white">
            Vous souhaitez résilier votre abonnement ?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-light">
            La suppression du compte et la gestion de l&apos;abonnement se font
            depuis ce site, et non depuis l&apos;application. Pour résilier ou
            gérer votre abonnement, utilisez le lien ci-dessous.
          </p>
          <a href="/gerer-abonnement" className="btn-primary mt-4 inline-block">
            Gérer mon abonnement
          </a>
        </div>
      ) : null}
    </LegalLayout>
  );
}
