import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '慢嶼｜把一點安靜，留給自己', description: '以聲音陪伴日常的數位音訊。探索慢嶼的呼吸與自然聲景，找回自己的節奏。' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="zh-Hant"><body>{children}<footer><a href="/">慢嶼 MANYU</a><p>讓生活慢一點，讓自己近一點。</p><div className="footer-links"><a href="/payment">付款與交付</a><a href="/privacy">隱私權政策</a><a href="/terms">服務條款</a><a href="/refunds">退款政策</a></div><small>© 2026 慢嶼 MANYU</small></footer></body></html> }
