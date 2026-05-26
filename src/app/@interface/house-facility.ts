export interface HouseFacilityUpdateDto {
  houseId: number;
  selectedFacilityIds: number[];
}

export interface Facility {
  id: number;
  name: string;
  category: string;
  iconClass: string;
  isSelected?: boolean; // 前端輔助欄位，用來控制 UI 勾選狀態
}
