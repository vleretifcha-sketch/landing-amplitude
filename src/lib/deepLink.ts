const ANDROID_PACKAGE = "app.amplitude.stretching";
const PAYMENT_SUCCESS_PATH = "/payment-success";

/** Conserve app_success / email quand l'utilisateur passe par la landing avant Stripe. */
export function persistPaymentReturnParams(): void {
  const params = new URLSearchParams(window.location.search);
  const appSuccess = params.get("app_success");
  const email = params.get("email");

  if (appSuccess) sessionStorage.setItem("amplitude_app_success", appSuccess);
  if (email) sessionStorage.setItem("amplitude_payment_email", email);
}

export function buildPaymentSuccessUrl(): string {
  const params = new URLSearchParams(window.location.search);
  let url =
    params.get("app_success") ||
    sessionStorage.getItem("amplitude_app_success") ||
    "amplitude://payment-success";

  const email =
    params.get("email") || sessionStorage.getItem("amplitude_payment_email");
  if (email && !url.includes("email=")) {
    url += `${url.includes("?") ? "&" : "?"}email=${encodeURIComponent(email)}`;
  }

  if (!params.get("app_success") && params.toString()) {
    const extra = params.toString();
    if (!url.includes(extra)) {
      url += `${url.includes("?") ? "&" : "?"}${extra}`;
    }
  }

  return url;
}

function parseCustomSchemeUrl(customUrl: string): { path: string; search: string } {
  try {
    const parsed = new URL(customUrl);
    const path = `${parsed.host}${parsed.pathname}`.replace(/\/$/, "") || "payment-success";
    return { path, search: parsed.search };
  } catch {
    const withoutScheme = customUrl.replace(/^amplitude:\/\//, "");
    const [path, ...queryParts] = withoutScheme.split("?");
    return {
      path: path || "payment-success",
      search: queryParts.length ? `?${queryParts.join("?")}` : "",
    };
  }
}

/** Intent Chrome Android — plus fiable que amplitude:// seul. */
export function buildAndroidIntentUrl(customUrl: string): string {
  const { path, search } = parseCustomSchemeUrl(customUrl);
  const fallback = encodeURIComponent(
    `${window.location.origin}${PAYMENT_SUCCESS_PATH}${window.location.search}`
  );
  return `intent://${path}${search}#Intent;scheme=amplitude;package=${ANDROID_PACKAGE};S.browser_fallback_url=${fallback};end`;
}

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent);
}

function openViaHiddenIframe(url: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "display:none;border:0;width:0;height:0";
  iframe.src = url;
  (document.body ?? document.documentElement).appendChild(iframe);
  setTimeout(() => iframe.remove(), 2500);
}

/**
 * Ouvre l'app via deep link.
 * - Android : intent URL (auto ou clic utilisateur).
 * - iOS auto : iframe cachée (évite l'alerte Safari).
 * - iOS clic : navigation directe.
 */
export function openDeepLink(
  url: string,
  options?: { fromUserGesture?: boolean }
): void {
  const launch = () => {
    if (isAndroid()) {
      window.location.href = buildAndroidIntentUrl(url);
      return;
    }

    if (options?.fromUserGesture) {
      window.location.href = url;
      return;
    }

    openViaHiddenIframe(url);
  };

  if (document.body) launch();
  else document.addEventListener("DOMContentLoaded", launch, { once: true });
}
