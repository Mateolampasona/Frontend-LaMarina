export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IModifyCategory {
  name: string;
  description: string;
}

export interface Category {
  categoryId: number;
  name: string;
  description: string;
}
