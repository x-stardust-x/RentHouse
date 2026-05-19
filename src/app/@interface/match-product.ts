export interface MatchProduct {
  productType: string;

  // id: number;
  // accountId?: number;
  // // districtId?: number;
  // name: string;
  // // address: string;
  // category: string;
  // description: string;
  // price: number;
  // priceUnit: number;



  id: number;
  accountId: number;
  name: string;
  category: string;       // '工具共享' 或 '專業諮詢'
  description: string;
  price: number;
  priceUnit: string;      // '日' / '小時' / '次'
  deposit: number;
  isOnline: boolean;
  quantity: number;
  ownTool?: string;
  requiredKnowledge?: string;
  imageUrl?: string;      // 預留圖片欄位
  address?: string;
}
