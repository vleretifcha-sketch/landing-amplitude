/** Conserve l'email de paiement pour l'afficher sur la page de retour post-paiement. */
export function persistPaymentReturnParams(): void {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  if (email) sessionStorage.setItem("amplitude_payment_email", email);
}
