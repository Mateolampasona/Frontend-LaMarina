import { IProduct } from "./IProducts";

export interface IOrderDetailAddProduct {
  productId: number;
  quantity: number;
}

export interface IDeleteProduct {
  detailId: string;
}

export interface IOrder {
  createdAt: string;
  orderId: string;
  status: string;
  totalOrder: number;
  orderDetails: IOrderDetail[];
}
export interface IOrderDetail {
  orderDetailId: string;
  quantity: number;
  product: IProduct;
}
