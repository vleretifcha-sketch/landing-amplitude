export const legalRoutes = {
  cgu: "/cgu",
  privacy: "/politique-de-confidentialite",
  legalNotice: "/mentions-legales",
  accountDeletion: "/politique-suppression-compte",
  community: "/charte-communaute",
  cookies: "/politique-cookies",
} as const;

export type LegalRouteKey = keyof typeof legalRoutes;

export function isLegalPath(path: string): path is (typeof legalRoutes)[LegalRouteKey] {
  return Object.values(legalRoutes).includes(path as (typeof legalRoutes)[LegalRouteKey]);
}

export function getLegalRouteKey(path: string): LegalRouteKey | null {
  const entry = Object.entries(legalRoutes).find(([, route]) => route === path);
  return entry ? (entry[0] as LegalRouteKey) : null;
}
