# AI 拔河比賽－小學數學乘法

這是一個可部署到 Vercel 的國小乘法遊戲專案。

## 專案內容

```text
index.html          遊戲主畫面
api/log.js          將遊戲紀錄送到 Google Apps Script
api/feedback.js     使用 OpenRouter 產生 AI 學習建議
vercel.json         Vercel 部署設定
.env.example        環境變數範例
```

## 部署到 GitHub / Vercel

1. 將整個資料夾上傳到 GitHub。
2. 到 Vercel 匯入此 GitHub 專案。
3. 到 Vercel 專案設定新增 Environment Variables。

```text
GAS_URL=你的 Google Apps Script Web App URL
AI_KEY=你的 OpenRouter API Key
```

## Google Apps Script

如果只需要記錄資料，至少要設定 `GAS_URL`。  
`AI_KEY` 可先不設定，遊戲仍可正常執行。

## 注意

請不要把 OpenRouter API Key 寫在 `index.html` 前端檔案中。
