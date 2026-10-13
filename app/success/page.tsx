import PolicyPage from '../../components/PolicyPage';
import Link from 'next/link';
export default function ReturnPage(){return <PolicyPage title="付款狀態尚待確認"><p>返回網站不代表付款已完成。本網站尚無可信的自動付款確認機制，不會在此顯示已付款成功，也不會提供付費商品下載。</p><p>若已在綠界付款，請保留交易編號，依付款說明聯絡客服。賣方核對綠界交易紀錄後，才會交付商品。</p><Link className="button" href="/payment">查看付款與交付說明 →</Link></PolicyPage>}
