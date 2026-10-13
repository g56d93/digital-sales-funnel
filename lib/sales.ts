export type SalesInput = {
 paymentUrl?: string; confirmed?: string; name?: string; price?: string;
 content?: string; deliveryTime?: string; supportEmail?: string; sellerName?: string;
};
export function validatePaymentUrl(raw?: string): string | null {
 try {
  const url = new URL(raw || '');
  // Only the official hosted payment destination; staging and lookalikes fail closed.
  if (url.protocol !== 'https:' || url.hostname !== 'payment.ecpay.com.tw' || url.port || url.username || url.password || url.pathname === '/' || url.hash) return null;
  return url.href;
 } catch { return null; }
}
export function getSalesConfig(input: SalesInput) {
 const paymentUrl = validatePaymentUrl(input.paymentUrl);
 const name = input.name?.trim() || '';
 const price = Number(input.price);
 const content = input.content?.trim() || '';
 const deliveryTime = input.deliveryTime?.trim() || '';
 const supportEmail = input.supportEmail?.trim() || '';
 const sellerName = input.sellerName?.trim() || '';
 const ready = input.confirmed === 'true' && !!paymentUrl && !!name
  && Number.isSafeInteger(price) && price > 0 && !!content && !!deliveryTime
  && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail) && !!sellerName;
 return { ready, paymentUrl, name, price, content, deliveryTime, supportEmail, sellerName };
}
// Public build-time configuration; no merchant keys or private audio URLs belong here.
export const sales = getSalesConfig({
 paymentUrl: process.env.NEXT_PUBLIC_PAYMENT_URL,
 confirmed: process.env.NEXT_PUBLIC_SALES_CONFIRMED,
 name: process.env.NEXT_PUBLIC_PRODUCT_NAME,
 price: process.env.NEXT_PUBLIC_PRODUCT_PRICE,
 content: process.env.NEXT_PUBLIC_PRODUCT_CONTENT,
 deliveryTime: process.env.NEXT_PUBLIC_DELIVERY_TIME,
 supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
 sellerName: process.env.NEXT_PUBLIC_SELLER_NAME,
});
