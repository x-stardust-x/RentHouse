export interface LoginResponse {
  message : string;
  token : string;
  username : string;
  role : string;

  subscriptionTier: number;
}
//沒有用
