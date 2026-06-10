export interface Admin {
  id: number;
  username : string;
  pwd: string;
  email: string;
  phone: string;
  isSuper : boolean;
  isDelete : boolean;
}

export interface AdminDto {
  username : string;
  pwd: string;
  email: string;
  phone: string;
}
