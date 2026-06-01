// 送出預約用的格式 (對應 Modal 填寫的內容)
export interface CreateViewingOrderRequest {
  houseId: number;
  lesseeId: number; // 承租人(當前登入者) ID
  lessorId: number; // 出租人(房東) ID
  viewingTime: string; // 對應 Modal 的 roomDate + 時間
  expectedMoveIn: string; // 對應 Modal 的 moveInTime
  message: string; // 想對房東說的話
  matchScore: number; // 暫定為前端計算或後端預設
}
