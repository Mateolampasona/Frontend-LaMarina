export interface ICategory_id {
  categoryId: number;
  name: string;
  description: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  quantitySell: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  category_id: ICategory_id;
}
