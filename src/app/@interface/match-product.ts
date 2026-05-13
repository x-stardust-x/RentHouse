export interface MatchProduct {
  productType: string;

  id: number;
  accountId?: number;
  // districtId?: number;
  name: string;
  // address: string;
  category: string;
  description: string;
  price: number;
  priceUnit: number;
}
