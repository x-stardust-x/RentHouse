export interface UserProfile {
  id: number;

  realName: string;
  englishName?: string;

  avatar?: string;

  phone?: string;
  lineId?: string;

  address?: string;

  bio?: string;

  rating: number;
  reviewCount: number;

  districtId : number;
  cityName: string;
  districtName: string;
  zipCode: string;

  sleepTime: string;
  wakeTime: string;

  cleanLevel: number;
  noiseTolerance: number;

  pet: boolean;
  smoke: boolean;

  interests?: string;
}

// export interface UpdateProfileDto {

//   realName: string;

//   englishName?: string;

//   phone?: string;

//   address?: string;

//   bio?: string;

//   districtId: number;

//   sleepTime: number;

//   wakeTime: number;

//   cleanLevel: number;

//   noiseTolerance: number;

//   pet: boolean;

//   smoke: boolean;

//   interests?: string;
// }
