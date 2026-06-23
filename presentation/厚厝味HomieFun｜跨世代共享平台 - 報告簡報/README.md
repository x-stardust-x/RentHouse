# 厚厝味｜新增兩頁視覺統一版

已依原始 HTML/CSS 簡報的視覺語言，重新整理「簡報目錄」與「團隊分工與開發成果」兩頁。

## 檔案

- `index.html`：已套入兩頁的完整 HTML
- `css/presentation.css`：已追加兩頁樣式與頁數總數調整
- `js/presentation.js`：提供基本簡報切換、全螢幕與列印功能
- `added-slides-snippet.html`：只含兩頁 HTML，可貼回原檔
- `added-slides-styles.css`：只含兩頁新增 CSS，可貼到原 CSS 最後

## 貼回原專案

1. 用 `added-slides-snippet.html` 取代原本兩個新增頁的 `<section>`。
2. 將 `added-slides-styles.css` 貼到原本 `presentation.css` 最後。
3. 因加入兩頁後共 17 頁，請確認：HTML 控制列 `totalPages` 為 `17`，CSS `.slide-number::before` 顯示 `" / 17"`。

## 視覺調整重點

- 簡報目錄改為滿版橙色章節頁，符合原設計中的品牌色塊節奏。
- 團隊頁改用原本的 `slide-header`、`section-label`、`brand-lockup`、`slide-thesis`、`slide-footer`。
- 團隊分工保留人物插圖、姓名、角色與工作標籤，但降低卡片感，改成開放式編輯排版。
