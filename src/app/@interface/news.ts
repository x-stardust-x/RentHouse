export interface News {
  id: number;
  adminId: number;

  category: string;

  cover : string;
  title: string;

  intro: string;
  content: string;

  seoTitle: string;
  seoDesc: string;

  status: number;

  createdAt: Date;
  updatedAt: Date;
}
