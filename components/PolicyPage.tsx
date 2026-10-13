import Link from 'next/link';
import { sales } from '../lib/sales';
export default function PolicyPage({title,children}:{title:string;children:React.ReactNode}) {
 return <><header><Link className="brand" href="/">慢嶼 <span>MANYU</span></Link><Link href="/">← 返回首頁</Link></header><main className="section policy"><p className="eyebrow">MANYU / CUSTOMER CARE</p><h1>{title}</h1>{!sales.ready&&<p className="status-banner">測試展示中，尚未開放購買；目前不接受付款或建立訂單。</p>}{children}<p className="note">賣方：{sales.sellerName || '尚未設定，販售未啟用'}<br/>客服：{sales.supportEmail?<a href={`mailto:${sales.supportEmail}`}>{sales.supportEmail}</a>:'尚未設定，販售未啟用'}</p></main></>;
}
