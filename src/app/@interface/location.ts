export interface City {
  id: number;
  cityName: string;
}
export interface District {
  id: number;
  cityId: number;
  districtName: string;
  zipCode: number;
}
