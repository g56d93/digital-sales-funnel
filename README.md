# 慢嶼｜Digital Sales Funnel

Next.js、TypeScript、Tailwind CSS 的單商品銷售網站。保留品牌首頁與免費試聽，使用綠界託管收款頁及人工核款交付，不設會員或金流 API。

## 安裝與驗證

Node.js >=20.9（已用 Node 24 驗證）。

```sh
npm ci --cache /tmp/manyu-npm-cache
npm run typecheck
npm run build
npm test
```

測試自動使用 `/usr/bin/chromium`，否則先 `npx playwright install chromium`。可用 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定瀏覽器。測試在獨立 3100 連接埠啟動正式版，不沿用預覽伺服器。

## 預覽

執行 `npm run dev`。本機開啟 http://localhost:3000；雲端的 localhost 不等於使用者電腦。GitHub Codespaces 需在其終端機另行安裝並啟動，從 Ports 複製 3000 的 HTTPS Forwarded Address 給手機，私人位址需登入相同 GitHub 帳號；Public 可讓任何持有網址的人存取。停止 Codespace 後不能預覽。

## 販售開關與上線前核對

將 `.env.example` 複製為 `.env.local`，或在部署平台設定同名變數。全部是公開設定，不含憑證；不要填入私人音檔網址。`NEXT_PUBLIC_` 會在建置時固定，修改後必須重新建置／部署。

- `NEXT_PUBLIC_PAYMENT_URL`：賣方建立的綠界正式收款連結。目前僅接受 HTTPS `payment.ecpay.com.tw` 下的非根目錄網址，拒絕測試網域、帳密、特殊埠與網址片段。不以 URL 格式驗證證明商店或金額正確；賣方須人工核對實際收款頁。若綠界提供不同正式網域，先查證再修改 allowlist，不要用短網址繞過。
- `NEXT_PUBLIC_PRODUCT_NAME`、`NEXT_PUBLIC_PRODUCT_PRICE`：實際名稱與正整數新臺幣售價。
- `NEXT_PUBLIC_PRODUCT_CONTENT`：實際音檔格式、數量、總長度與交付內容。
- `NEXT_PUBLIC_DELIVERY_TIME`：人工核款後可確實遵守的最晚交付時間。
- `NEXT_PUBLIC_SUPPORT_EMAIL`、`NEXT_PUBLIC_SELLER_NAME`：實際客服信箱與賣方名稱。
- `NEXT_PUBLIC_SALES_CONFIRMED=true`：賣方已確認音檔存在、收款頁名稱／金額一致、客服可收信、下載權限及人工交付流程已演練，並接受網站公布的退款與服務承諾。不能只為開啟按鈕而設為 true。

缺一項或 URL 不合法，購買按鈕停用，不顯示正式商品售價。只有網址也不會啟用。現有公開素材只有 `public/preview.wav`，為 30 秒合成聲景，非三段完整商品；首頁三張卡片是品牌靈感，不是交付清單。正式音檔不要放入 `public` 或公開 GitHub 儲存庫。

### 人工交易流程

1. 顧客閱讀 `/payment`、隱私、服務及退款政策後，透過購買按鈕前往同一綠界連結。
2. 顧客保留交易編號並寄送客服及收件 email。賣方以綠界後台實際付款狀態核款，不採信截图或回跳。
3. 在承諾時間內寄送個別可用的音檔下載連結，核對收件人與檔案權限，記錄交付結果。
4. 未交付、錯誤檔案、重複付款或解除交易申請，依 `/refunds` 處理。本站承諾客服三個工作日內回覆；尚未取得排除數位內容解除權的有效同意，不主張一律不退費。

上線前用賣方正式環境進行一筆授權的端到端付款／核款／收件與退款演練，檢查名稱、金額、信件、音檔權限及期限。自動測試不會實際付款，尚未實測的付款不可宣稱驗證完成。

## 路由與追蹤限制

`/checkout` 轉到 `/payment`；`/success` 只說明付款尚待確認，無論 query 或舊 sessionStorage 內容如何，都不宣布成功或解鎖商品。

`lib/tracking.ts` 保留 UTM 與 Meta Pixel 介面，但未載入 Pixel、未儲存 UTM、未發送任何事件。追蹤介面需明確同意且限制事件種類，禁止 Purchase。未來應先建立可信伺服器付款確認及事件去重，再另行實作 Purchase，不能以回跳或點擊判定。
