// 接收預約列表用的格式 (對應審核頁面的卡片)
export interface ViewingOrderResponse {
  id: number;
  reservationNo: string;
  status: number; // 0: 待審核, 1: 已確認, 2: 已婉拒
  roomName: string;
  applicantName: string;
  applicantAvatar: string;
  applicantTags: string; // 可以是用逗號分隔的字串
  expectedMoveIn: string;
  viewingTime: string;
  message: string;
  matchScore: number;
}
