import Link from 'next/link';
import PolicyPage from '../../components/PolicyPage';
import {sales} from '../../lib/sales';
export default function Terms(){return <PolicyPage title="服務條款"><h2>商品與交易</h2><p>{sales.ready?`販售商品為「${sales.name}」，售價 NT$ ${sales.price.toLocaleString('zh-TW')}，交付內容為：${sales.content}。`:'目前為測試展示，正式商品及價格未確認，不接受訂單或付款。'} 免費試聽與付費商品不同，請依正式商品說明決定是否購買。</p><p>交易付款狀態由賣方核對綠界後台紀錄；本站回跳頁面無法證明付款成功。若綠界收款內容與本站不一致，請勿付款並聯絡客服。</p><h2>使用範圍</h2><p>交付的音訊供購買者個人聆聽。未經另行授權，不得轉售、公開散布或提供他人下載。音訊供日常休息使用，不是醫療建議或治療服務。</p><h2>交付與售後</h2><p>採人工核款後電子郵件交付，詳見<Link href="/payment">付款與交付說明</Link>。無法下載、檔案錯誤或超過交付時間時，請聯絡客服補寄、更正或申請退款。</p><h2>消費者權益</h2><p>退款依<Link href="/refunds">退款政策</Link>處理。本站不以點擊購買或下載即視為放棄法定權利；適用法律賦予的強制權益不因本條款而減損。</p></PolicyPage>}
