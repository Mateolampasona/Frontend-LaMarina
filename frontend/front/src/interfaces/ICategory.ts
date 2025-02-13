export interface ICreateCategory {
  id?: number;
  name: string;
  description: string;
}

export interface IModifyCategory {
  name: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
