

export interface IOrderDetailAddProduct {
  productId: number;
  quantity: number;
}

export interface IDeleteProduct{
  detailId: string;
}

export interface IOrder {
  createdAt:string
  id:string
  status:string
  totalOrder:number
}