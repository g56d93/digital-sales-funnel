# 慢嶼｜Digital Sales Funnel

以 Next.js App Router、TypeScript、Tailwind CSS 建立的繁體中文數位音訊商品網站。

## 本機預覽

需要 Node.js 20.9 以上（已於 Node.js 24 驗證）。

```sh
npm ci --cache /tmp/manyu-npm-cache
npm run dev
```

在你的電腦開啟 http://localhost:3000 。雲端使用平台提供的連接埠預覽功能，選擇 3000；若平台沒有預覽功能，可下載專案後在本機執行。

## 編譯與正式模式

```sh
npm run build
npm run start
```

## 驗證

```sh
npm run typecheck
PLAYWRIGHT_BROWSERS_PATH=/tmp/manyu-browsers npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=/tmp/manyu-browsers npm test
```

雲端環境已有 Chromium，可直接執行：

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

測試涵蓋手機購買流程、表單必填、音訊播放、下載、訂單重新整理與無訂單直接訪問感謝頁。

## 頁面與資料

- `/`：品牌首頁、商品介紹、FAQ、音訊試聽。
- `/checkout`：原生表單驗證與模擬付款。
- `/success`：此分頁訂單摘要、示範音訊下載。

沒有真實金流、憑證、後端或郵件服務。請輸入測試資料；稱呼與電子郵件只存於瀏覽器 sessionStorage，關閉分頁後不保留。這不是正式付款或訂單驗證機制。

`public/preview.wav` 是本專案產生的 30 秒合成聲景，沒有第三方音訊素材。三段完整商品為展示規劃，尚未提供；首頁、結帳、感謝頁均有標示。下載的是示範檔案。
