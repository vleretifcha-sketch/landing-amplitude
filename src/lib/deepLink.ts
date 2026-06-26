export function buildPaymentSuccessUrl(): string {
  const params = new URLSearchParams(window.location.search);
  let url = params.get("app_success") || "amplitude://payment-success";

  if (!params.get("app_success") && params.toString()) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + params.toString();
  }

  return url;
}

/** Ouvre un deep link sans naviguer la page (évite l'alerte Safari sur iOS). */
export function openDeepLink(url: string): void {
  const launch = () => {
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "display:none;border:0;width:0;height:0";
    iframe.src = url;
    (document.body ?? document.documentElement).appendChild(iframe);
    setTimeout(() => iframe.remove(), 2500);
  };

  if (document.body) launch();
  else document.addEventListener("DOMContentLoaded", launch, { once: true });
}
