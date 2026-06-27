# RentHouse（前端）

RentHouse 是一個租屋平台的前端專案，使用 **Angular 21** 開發，提供使用者瀏覽房源、管理會員資料、租屋媒合、房東管理等功能，並透過 RESTful API 與後端系統進行資料交換。

本專案主要負責前端介面、使用者互動及 API 串接。

本專案使用 **Angular CLI 21.2.7** 建立。

---

## 專案功能

目前包含以下功能：

- 會員登入／註冊
- JWT 身分驗證
- 房源瀏覽
- 房源詳細資訊
- 房屋媒合
- 會員中心
- 房東管理功能
- 響應式網頁設計（Responsive Design）
- RESTful API 串接

---

## 開發環境

啟動本地開發伺服器：

```bash
ng serve
```

啟動完成後，瀏覽器開啟：

```
http://localhost:4200/
```

修改程式碼後，Angular 會自動重新編譯並更新畫面（Hot Reload）。

> **注意：** 使用本專案前，請先確認後端 API 已啟動，否則部分功能將無法正常使用。

---

## 建立元件

建立新的 Component：

```bash
ng generate component 元件名稱
```

或使用簡寫：

```bash
ng g c 元件名稱
```

若要建立其他類型（Service、Directive、Pipe...）：

```bash
ng generate --help
```

---

## 建置專案

執行 Production Build：

```bash
ng build
```

建置完成後，輸出檔案會放置於：

```
dist/
```

---

## 執行單元測試

本專案使用 **Vitest** 作為測試框架：

```bash
ng test
```

---

## 執行 E2E 測試

```bash
ng e2e
```

Angular CLI 預設未提供 E2E 測試框架，可依專案需求自行選擇。

---

## 使用技術

- Angular 21
- TypeScript
- Bootstrap
- Angular Router
- Angular Signals
- RxJS
- RESTful API

---

## 後端

本 Repository 僅包含 **Angular 前端專案**。

後端 API 為獨立專案，提供以下功能：

- JWT 身分驗證
- 會員管理
- 房屋管理
- 房屋媒合
- 圖片上傳
- 通知服務
- 資料庫存取

（後端 Repository 將於後續補充。）

---

## 參考資料

Angular CLI 官方文件：

https://angular.dev/tools/cli
