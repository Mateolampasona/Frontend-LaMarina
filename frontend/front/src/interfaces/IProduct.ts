export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  isActive: boolean;
  imageUrl?: string;
}

export interface IUpdateproduct {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category_id?: number;
  isActive?: boolean;
  imageUrl?: string;
}
