# 旅圖誌 Travel Atlas — 旅遊資訊網站

> 網頁設計課程習作｜學員編號：16｜姓名：ChowYiuWah
> 最後更新：2026 年

---

## 1. 專案簡介

「旅圖誌」是一個**純前端**的旅遊資訊網站，介紹四個來自不同國家的旅遊地點：

| 地點 | 國家 | 頁面 |
| --- | --- | --- |
| 京都 Kyoto | 日本 | `kyoto.html` |
| 羅馬 Rome | 意大利 | `rome.html` |
| 開羅 Cairo | 埃及 | `cairo.html` |
| 庫斯科 Cusco | 秘魯 | `cusco.html` |

網站共 **7 個頁面**，每個地點都包含歷史簡介、文化特色、四個必去景點、旅行者實用資料（最佳季節／貨幣／語言／交通／簽證與安全提示），以及一段 YouTube 影片。

**技術重點**

- 只用純 HTML、CSS、JavaScript 手寫，**沒有使用任何前端框架**（沒有 Bootstrap、Tailwind、jQuery）。
- **沒有引入任何 CDN 或外部字體**，字體全部使用系統字體。
- 零 build tool、零 npm、零本機伺服器：**直接雙擊 `index.html` 就可以開啟**。
- 響應式設計採用 mobile-first 寫法，斷點為 768px（平板）與 1024px（桌面）。

---

## 2. 檔案結構

```text
16_ChowYiuWah_webpage/
├── index.html          首頁：Hero、四地點卡片、網站簡介、旅遊影片
├── destinations.html   目的地總覽：篩選與排序、四張地點卡、六欄對比表
├── kyoto.html          日本京都詳細頁
├── rome.html           意大利羅馬詳細頁
├── cairo.html          埃及開羅詳細頁
├── cusco.html          秘魯庫斯科詳細頁
├── about.html          關於本站：網站介紹、聯絡表單、FAQ 手風琴
├── README.md           本檔案
├── css/
│   └── style.css       全站樣式（21 個區塊，含 768px 與 1024px 斷點）
├── js/
│   └── script.js       全站互動（漢堡菜單、篩選排序、Lightbox、表單驗證、返回頂部）
└── images/
    └── 25 張 .jpg      目前全部是佔位圖，請按第 4 節說明替換
```

---

## 3. 圖片清單（共 25 張）

目前的圖片全部是**程式產生的佔位圖**，每張圖上都印有大字檔名，方便你逐張對應替換。

### 首頁與共用圖（5 張）

| 檔名 | 尺寸 | 用途 |
| --- | --- | --- |
| `index-hero.jpg` | 1600 × 900 | 首頁 Hero 大圖。**`destinations.html` 的 Hero 共用此圖**，換一張即可同時更新兩頁。 |
| `index-card-kyoto.jpg` | 800 × 600 | 首頁卡片：日本京都 |
| `index-card-rome.jpg` | 800 × 600 | 首頁卡片：意大利羅馬 |
| `index-card-cairo.jpg` | 800 × 600 | 首頁卡片：埃及開羅 |
| `index-card-cusco.jpg` | 800 × 600 | 首頁卡片：秘魯庫斯科 |

### 京都 KYOTO（5 張）

| 檔名 | 尺寸 | 用途 |
| --- | --- | --- |
| `kyoto-hero.jpg` | 1600 × 900 | 京都頁代表圖（頁面頂部大圖） |
| `kyoto-spot-1.jpg` | 800 × 600 | 景點 1：金閣寺 Kinkaku-ji |
| `kyoto-spot-2.jpg` | 800 × 600 | 景點 2：伏見稻荷大社 Fushimi Inari Taisha |
| `kyoto-spot-3.jpg` | 800 × 600 | 景點 3：清水寺 Kiyomizu-dera |
| `kyoto-spot-4.jpg` | 800 × 600 | 景點 4：嵐山竹林小徑 Arashiyama Bamboo Grove |

### 羅馬 ROME（5 張）

| 檔名 | 尺寸 | 用途 |
| --- | --- | --- |
| `rome-hero.jpg` | 1600 × 900 | 羅馬頁代表圖 |
| `rome-spot-1.jpg` | 800 × 600 | 景點 1：羅馬競技場 Colosseum |
| `rome-spot-2.jpg` | 800 × 600 | 景點 2：古羅馬廣場 Roman Forum |
| `rome-spot-3.jpg` | 800 × 600 | 景點 3：萬神殿 Pantheon |
| `rome-spot-4.jpg` | 800 × 600 | 景點 4：特雷維噴泉 Trevi Fountain |

### 開羅 CAIRO（5 張）

| 檔名 | 尺寸 | 用途 |
| --- | --- | --- |
| `cairo-hero.jpg` | 1600 × 900 | 開羅頁代表圖 |
| `cairo-spot-1.jpg` | 800 × 600 | 景點 1：吉薩金字塔與獅身人面像 |
| `cairo-spot-2.jpg` | 800 × 600 | 景點 2：埃及博物館 |
| `cairo-spot-3.jpg` | 800 × 600 | 景點 3：薩拉丁城堡 |
| `cairo-spot-4.jpg` | 800 × 600 | 景點 4：哈利利市集 |

### 庫斯科 CUSCO（5 張）

| 檔名 | 尺寸 | 用途 |
| --- | --- | --- |
| `cusco-hero.jpg` | 1600 × 900 | 庫斯科頁代表圖 |
| `cusco-spot-1.jpg` | 800 × 600 | 景點 1：馬丘比丘 Machu Picchu |
| `cusco-spot-2.jpg` | 800 × 600 | 景點 2：薩克塞華曼 Sacsayhuamán |
| `cusco-spot-3.jpg` | 800 × 600 | 景點 3：太陽神殿 Qorikancha |
| `cusco-spot-4.jpg` | 800 × 600 | 景點 4：彩虹山 Vinicunca |

---

## 4. 如何替換圖片

### 最簡單的做法

1. 準備好你的照片。
2. 把照片**改名成上表其中一個檔名**（例如 `kyoto-spot-1.jpg`）。
3. 直接覆蓋 `images/` 資料夾內的同名檔案。

**HTML 完全不需要修改**，只要檔名相同，網站就會自動使用新圖片。

### 建議的真實照片尺寸

| 用途 | 建議像素 | 建議比例 | 備註 |
| --- | --- | --- | --- |
| Hero 大圖（`*-hero.jpg`、`index-hero.jpg`） | 1920 × 1080 或以上 | 16:9 | 橫向風景照效果最好。文字會疊在圖片下半部，主體盡量不要放在正中間。 |
| 卡片與景點圖（`*-spot-*.jpg`、`index-card-*.jpg`） | 1200 × 900 或以上 | 4:3 | 網站會用 `object-fit: cover` 裁切，主體放中間最安全。 |

### 兩個要注意的地方

- **景點圖實際顯示比例是 16:10**，用 4:3 的照片會被上下輕微裁切；如果介意，可以直接提供 16:10 的照片。
- **`alt` 文字要一併更新**：每個 `<img>` 的 `alt` 描述的是「預期的那張照片」（例如「金閣寺貼滿金箔的舍利殿，倒映在鏡湖池上」）。如果你換上的照片內容不同，請順手修改該 `alt` 屬性，否則會影響無障礙閱讀與評分。檔案位置可用編輯器搜尋該圖片檔名找到。

---

## 5. YouTube 影片清單

所有影片都用 `youtube-nocookie.com` 的隱私加強模式嵌入，並加上 `loading="lazy"` 延遲載入。

| 頁面 | 目前影片 ID | 標題 | 頻道 | 建議替換方向 |
| --- | --- | --- | --- | --- |
| `index.html` | `BpITZk7sa8E` | Travel the World in 4K HDR | Beautiful World 4K Film Music | 可換成任何「環遊世界」或旅遊合輯影片；長度較長的風景片效果不錯。 |
| `kyoto.html` | `3gX-umzVl9s` | Kyoto Travel Guide — The Best Things to Do in Kyoto | Allan Su | 可換成涵蓋金閣寺、伏見稻荷、清水寺、嵐山的行程介紹。 |
| `rome.html` | `bhJU_fVHMmY` | Rome Italy 4K Walking Tour | Duslin Travels | 可換成羅馬競技場、特雷維噴泉、萬神殿一帶的漫步影片。 |
| `cairo.html` | `mIUTejz0MBU` | 3 Days in Cairo, Egypt (4K Travel Guide) | Travel2Places | 可換成以吉薩金字塔為主的介紹影片。 |
| `cusco.html` | `guKtcK6MrLo` | 4 Days in Cusco, Peru (4K Travel Guide) | Travel2Places | 可換成庫斯科市區加馬丘比丘的行程影片。 |

### 如何更換影片

1. 在 YouTube 找到想用的影片，複製網址中 `watch?v=` 後面那一段。例如網址寫 `www.youtube.com/watch?v=XXXXXXXXXXX`，要複製的 ID 就是 `XXXXXXXXXXX`（共 11 個字元）。
2. 在對應的 HTML 檔案中搜尋 `youtube-nocookie.com/embed/`，把舊 ID 換成新 ID。
3. 同時修改該 `<iframe>` 的 `title` 屬性，簡單描述影片內容（供螢幕報讀器使用）。
4. **注意**：部分影片的擁有者不允許嵌入播放。更換後請用瀏覽器開啟該頁確認影片真的能播放，不要只看縮圖。

> 目前這 5 個 ID 都已經用 YouTube oEmbed API 驗證過，確認影片存在並允許嵌入。但影片日後仍可能被刪除或更改設定，屆時只要按上面步驟換 ID 就可以。

---

## 6. 技術決定記錄

| 項目 | 決定 | 原因 |
| --- | --- | --- |
| 框架 | 完全不使用 | 按要求以純 HTML／CSS／JS 手寫。（老師原文允許使用 Bootstrap、Tailwind 或 jQuery，此處刻意選擇不使用，以展示手寫能力。） |
| CSS 組織 | 單一 `css/style.css`，用 `:root` 自訂變數管理主色與圓角陰影 | 統一樣式來源，改色只需改幾個變數 |
| 斷點 | 768px、1024px，mobile-first | 先寫手機版，再用 `min-width` 加強 |
| 卡片欄數 | 地點卡片 1／2／4 欄；景點卡 1／2／2 欄 | 景點卡內含段落文字，桌面切成 4 欄每欄只剩約 230px，中文一行的字數太少，可讀性會變差 |
| 當前頁高亮 | 各頁 HTML 直接寫 `is-active` 加 `aria-current="page"` | 用 `file://` 直接開檔時最可靠，不依賴 JavaScript 判斷路徑 |
| FAQ 手風琴 | 純 `<details>`／`<summary>`，不寫 JavaScript | 原生已支援鍵盤操作與螢幕報讀器，加 JS 只會增加出錯風險；展開動畫由 CSS 負責 |
| 表單驗證 | 表單加 `novalidate`，驗證全部交由 JavaScript | 若保留瀏覽器原生驗證，它會先用英文氣泡擋下提交，使用者就看不到自訂的中文錯誤訊息 |
| 表單送出 | 只做前端驗證與成功提示，資料不會送出 | 本站沒有後端伺服器 |
| Lightbox | 少量 JavaScript（點圖開啟，關閉鍵、點背景、Esc 鍵都可關閉） | 純 CSS 的 `:target` 做法難以支援鍵盤操作，關閉後也無法把焦點還給原圖 |
| 返回頂部按鈕 | 全站每一頁都有，共用同一段 JS | 行為一致；捲動超過 300px 才出現，避免一開始就擋住內容 |
| 篩選與排序 | 資料來源是 HTML 內的 `data-*` 屬性，卡片與對比表同步更新 | 即使 JavaScript 失效，四個地點與表格內容仍然完整可讀 |
| 橫向滾動 | 沒有使用 `overflow-x: hidden` 遮蓋問題 | 改用 `min-width: 0`、`max-width: 100%`、`aspect-ratio` 由根本解決；對比表則放在 `.table-wrap` 內自行橫向滾動 |
| 無障礙 | 圖片全部有 `alt`、互動元素有 `aria` 屬性、`:focus-visible` 有明顯外框、尊重 `prefers-reduced-motion` | 提升易用性 |
| 顏色對比 | 所有文字與底色的對比度都達 WCAG AA（正文 12.6:1、連結 7.1:1、Hero 標題最壞情況約 4.7:1） | 確保文字易讀 |

### 想新增第五個地點時

1. 複製任何一個地點頁（例如 `kyoto.html`），改成新檔名。
2. 在 `destinations.html` 加一張新的 `<article class="card" data-destination="…">`，並填好 `data-country`、`data-country-en`、`data-season`、`data-season-order`、`data-name-en`。
3. 在對比表的 `<tbody>` 加一列 `<tr data-destination="…">`，`data-destination` 的值要與卡片一致。
4. 在七個頁面的導覽列與頁尾加連結。
5. 如果新增了季節（例如「夏季」），記得在 `#filter-season` 的下拉選單加入對應的 `<option>`。

---

## 7. 待辦事項（交作業前要自己完成）

- [ ] **找齊 25 張真實照片**，並按第 4 節的方式覆蓋 `images/` 內的同名檔案。
- [ ] **更新 `alt` 文字**：如果換上的照片內容與原本描述不同，請修改對應的 `alt` 屬性。
- [ ] **更新 `about.html` 的 `<meta name="description">` 與頁首資料**（如需）。
- [ ] **檢查 5 段 YouTube 影片仍可播放**（見第 5 節）。
- [ ] **校對內容**：歷史、文化、簽證與安全提示雖然已盡量查證，但政策會變動，建議交之前再快速核對一次。
- [ ] **壓縮成 ZIP**：把整個資料夾壓縮，檔名建議為 `04_CheungChunKin_webpage.zip`。
- [ ] **最後測試**：雙擊 `index.html`，確認 7 個頁面都能開啟，並用瀏覽器的開發者工具（F12）確認 Console 沒有錯誤訊息。

---

## 8. 聲明

- 本網站為**網頁設計課程的課堂習作**，只作學習與示範用途，並非商業網站。
- 網站內容整理自公開的旅遊資訊、各地官方旅遊局與博物館網站，僅供參考。**簽證、入境要求與安全狀況會隨時變動，出發前請務必查閱目的地官方領事館或入境部門的最新公告。**
- 目前 `images/` 內的圖片全部是**程式產生的佔位圖**（漸變背景加檔名文字），並非真實照片。
- 替換圖片時，**請使用你有權使用的照片**。如果使用免費圖庫（例如 Unsplash、Pexels、Pixabay），建議在圖片說明或本檔案記錄來源與作者，以尊重原作者；若圖片來自其他網站，請先確認授權條款。
- 網站嵌入的 YouTube 影片版權均屬原作者所有，本站僅以 YouTube 官方提供的嵌入方式引用。
- 聯絡表單只作 JavaScript 前端驗證示範，**不會傳送或儲存任何資料**。
