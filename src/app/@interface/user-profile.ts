export interface UserProfile {
  id: number;

  realName: string;
  englishName?: string;

  avatarUrl?: string;

  phone?: string;

  address?: string;

  bio?: string;

  rating: number;
  reviewCount: number;

  cityName: string;
  districtName: string;
  zipCode: string;

  sleepTime: number;
  wakeTime: number;

  cleanLevel: number;
  noiseTolerance: number;

  pet: boolean;
  smoke: boolean;

  interests?: string;
}

export interface UpdateProfileDto {

  realName: string;

  englishName?: string;

  phone?: string;

  address?: string;

  bio?: string;

  districtId: number;

  sleepTime: number;

  wakeTime: number;

  cleanLevel: number;

  noiseTolerance: number;

  pet: boolean;

  smoke: boolean;

  interests?: string;
}
