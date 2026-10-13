import { sales, type getSalesConfig } from '../lib/sales';
export default function PurchaseButton({ className = 'button', config = sales }: { className?: string; config?: ReturnType<typeof getSalesConfig> }) {
 return config.ready && config.paymentUrl
  ? <a className={className} href={config.paymentUrl} rel="noreferrer">前往綠界付款 ↗</a>
  : <button className={className} type="button" disabled aria-label="測試展示，尚未開放購買">尚未開放購買</button>;
}
