export interface MatchFilter {
  category: string;
  city: string;
  priceMin: number;
  priceMax: number;
  sortOrder: 'newest' | 'oldest';

  // 針對「房間出租」的專屬條件
  isSmartMatch: boolean;
  lifeStyle: string[]; // 存放勾選的生活風格，例如 ['smoking', 'pets']

  // 進階條件 (對應資料庫的 AdvancedRules JSON)
  routines: string[];
  showerRestrictions: string[];
  visitorPolicies: string[];
  cookingHabits: string[];
  fridgeAllocations: string[];
  interactionFrequencies: string[];
}
