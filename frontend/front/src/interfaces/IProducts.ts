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
export interface ICategory {
  categoryId: number;
  name: string;
  description: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number | null;
  originalPrice: number | null;
  imageUrl: string;
  stock: number;
  quantitySell: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category_id: ICategory; // Actualizado aquí
}
