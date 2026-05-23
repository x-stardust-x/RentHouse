export interface FAQ_C {
  id : number;
  name : string;
  sortOrder : number;
  isActive : boolean;
}

export interface FAQ_I {
  id : number;
  categoryId : number;
  question : string;
  answer : string;
  sortorder : number;
  status : number;
  viewCount : number;
  CreatedAt : Date;
  UpdatedAt : Date;
}

export interface FAQ_IDto{
  categoryId : number;
  question : string;
  answer : string;
  sortorder : number;
  status : number;
}
