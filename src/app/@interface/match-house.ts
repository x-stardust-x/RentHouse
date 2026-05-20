export interface MatchHouseDto {
  productType: string; // 預設 "House"

  // 房屋基本資料
  id: number;
  accountId?: number;
  districtId?: number;
  name: string;
  address: string;
  description: string;
  rentPrice: number;
  includeUtilities: boolean;
  includeWifi: boolean;
  includeManagementFee: boolean;
  areaSize?: number | null;
  leaseTerm?: number;
  floorInfo: string;
  houseType: string;
  viewCount?: number;
  status: number;
  url?: string;

  // 生活習慣規範
  houseId?: number;
  sleepTime?: number | null;
  wakeTime?: number | null;
  cleanLevel?: number | null;
  noiseTolerance?: number | null;
  pet?: boolean | null;
  smoke?: boolean | null;
}
