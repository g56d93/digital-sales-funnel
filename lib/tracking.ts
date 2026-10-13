// Integration boundary only. No pixel script, storage or tracking is enabled.
export const UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const;
export function readUtm(search: string) {
 const params = new URLSearchParams(search);
 return Object.fromEntries(UTM_KEYS.flatMap(key => {
  const value = params.get(key);
  return value ? [[key, value.slice(0, 200)]] : [];
 }));
}
export type AllowedEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout';
export function trackWithConsent(event: AllowedEvent, consent: boolean, send: (event: AllowedEvent) => void) {
 // Runtime allowlist also blocks unsafe callers attempting Purchase.
 if (consent && ['PageView','ViewContent','InitiateCheckout'].includes(event)) send(event);
}
