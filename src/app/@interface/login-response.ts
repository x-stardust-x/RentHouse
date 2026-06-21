export interface LoginResponse {
  message : string;
  token : string;
  username : string;
  role : string;

  subscriptionTier?: number;

  accountId?: number;
  userId?: number;
}
//沒有用
