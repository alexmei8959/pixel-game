# 像素風問答遊戲 (Pixel Quiz Game)

這是一個使用 React 與 Vite 開發，帶有復古像素風格的問答遊戲。遊戲使用 Google Sheets 作為後端資料庫與題目來源，並透過 Google Apps Script (GAS) 作為 API 中介。

## 🚀 安裝與執行指令

1. 確保已安裝 Node.js (建議版本 v18+)
2. 在專案根目錄下執行安裝指令：
   ```bash
   npm install
   ```
3. 建立或編輯 `.env` 檔案，並設定對應的值：
   ```env
   VITE_GOOGLE_APP_SCRIPT_URL=你的_GAS_網頁應用程式網址
   VITE_PASS_THRESHOLD=3
   VITE_QUESTION_COUNT=5
   ```
4. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

## 📊 Google Sheets 設定教學

1. 建立一個新的 Google 試算表。
2. 建立兩個工作表 (Sheet)，請務必分別命名為 `Questions` 與 `Scores`。
3. 在 `Questions` 工作表的第一列設定以下標題 (A 到 F 欄)：
   - A1: `Question` (題目)
   - B1: `Option A`
   - C1: `Option B`
   - D1: `Option C`
   - E1: `Option D`
   - F1: `Answer` (正確答案，請填入 A, B, C 或 D)
4. 在 `Scores` 工作表的第一列設定以下標題：
   - A1: `Timestamp` (時間戳記)
   - B1: `UserId` (使用者 ID)
   - C1: `Score` (分數)
   - D1: `Passed` (是否及格)

## ⚙️ Google Apps Script (GAS) 詳細操作

1. 在剛剛建立的 Google 試算表中，點擊上方選單的 **「擴充功能」 -> 「Apps Script」**。
2. 將預設的程式碼清空，貼上負責處理 `doGet` (讀取題目) 與 `doPost` (寫入分數) 請求的 GAS 程式碼。
3. 儲存專案 (Ctrl+S 或點擊磁碟機圖示)。
4. 點擊右上角的 **「部署」 -> 「新增部署作業」**。
5. 點擊「選取類型」旁邊的齒輪圖示，選擇 **「網頁應用程式」**。
6. 設定如下：
   - **說明**：自訂 (例如：`Pixel Game API`)
   - **執行身分**：`我 (你的信箱)`
   - **誰可以存取**：`所有人`
7. 點擊 **「部署」**。
8. **授權存取**：第一次部署時會跳出授權視窗，點擊「授權存取」 -> 選擇你的 Google 帳號 -> 點擊「進階」 -> 點擊「前往... (不安全)」 -> 點擊「允許」。
9. 部署完成後，複製 **「網頁應用程式網址」** (網址格式如 `https://script.google.com/macros/s/.../exec`)。
10. 將複製的網址貼到本專案 `.env` 檔案中的 `VITE_GOOGLE_APP_SCRIPT_URL` 變數中。
*(註：若後續有修改 GAS 程式碼，請務必重新執行「部署」->「管理部署作業」->「編輯」->「新版本」來更新。)*

## 📝 測試題庫：生成式 AI 基礎知識

您可以直接複製以下 10 個選擇題 (包含標題列)，貼上到 Google Sheets 的 `Questions` 工作表中進行測試：

| Question | Option A | Option B | Option C | Option D | Answer |
| --- | --- | --- | --- | --- | --- |
| 下列何者是生成式 AI 的主要功能？ | 儲存資料 | 產生新的內容 | 加速網路連線 | 防禦電腦病毒 | B |
| ChatGPT 是基於哪一種 AI 模型架構？ | CNN (卷積神經網路) | RNN (循環神經網路) | Transformer (變換器) | GAN (生成對抗網路) | C |
| Midjourney 主要被用來生成什麼類型的內容？ | 音樂 | 文字 | 圖像 | 程式碼 | C |
| 關於 AI 幻覺 (AI Hallucination)，下列敘述何者正確？ | 產生了完全正確的事實 | 產生看似合理但虛構的內容 | 因為硬體過熱而當機 | 看見了不存在的物體 | B |
| 下列哪一個不是常見的大型語言模型 (LLM)？ | GPT-4 | Claude 3 | Gemini | Photoshop | D |
| Prompt Engineering (提示工程) 的目的是什麼？ | 修理電腦硬體設備 | 引導 AI 產出更精確的結果 | 加快 AI 模型的訓練速度 | 破解 AI 系統的密碼 | B |
| 下列何者是 GAN (生成對抗網路) 的主要組成部分？ | CPU 與 GPU | 生成器與判別器 | 編碼器與解碼器 | 客戶端與伺服器 | B |
| 在使用生成式 AI 時，應該注意哪些潛在的風險？ | 著作權爭議 | 資訊安全與隱私洩漏 | 帶有偏見或歧視的內容 | 以上皆是 | D |
| Token 在大型語言模型中代表什麼意思？ | 模型處理文本的基本單位 | 購買 AI 的專屬貨幣 | AI 模型本身的重量 | 網路連線的密碼金鑰 | A |
| 下列哪一個工具可以透過文字描述自動生成程式碼？ | GitHub Copilot | Microsoft Word | Google Maps | Adobe Illustrator | A |
