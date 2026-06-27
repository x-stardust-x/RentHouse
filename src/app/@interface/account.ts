export interface Account {
  id: number;
  userName : string;
  pwd : string;
  email: string;
  birthday: Date;
  age: number;
  identity: number;
  status: boolean;
  isDelete: boolean;
  lastLoginAt: Date;
}
