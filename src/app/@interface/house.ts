export interface CreateHouseDto {
  accountId?: number;
  districtId?: number;
  name: string;
  address: string;
  description: string;
  rentPrice: number;
  includeUtilities: boolean;
  includeWifi: boolean;
  includeManagememtFee: boolean;
  areaSize?: number | null;
  leaseTerm?: number;
  floorInfo: string;
  houseType: string;
  viewCount?: number;
  status: number;

  sleepTime: string;
  wakeTime: string;
  cleanLevel: number;
  noiseTolerance: number;
  pet: boolean;
  smoke: boolean;
  interests: string;
  advancedRules: string;

  routineType?: string;
  showerRestriction?: string;
  visitorPolicy?: string;
  cookingHabit?: string;
  fridgeAllocation?: string;
  interactionFrequency?: string;
  advancedRulesNote?: string;
}
