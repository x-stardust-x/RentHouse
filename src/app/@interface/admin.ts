export interface Admin {
  id: number;
  username : string;
  pwd: string;
  email: string;
  phone: string;
}

export interface AdminDto {
  username : string;
  pwd: string;
  email: string;
  phone: string;
}
