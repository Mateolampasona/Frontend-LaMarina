import { IAddress } from "./IAddress";
import { IDiscount } from "./IDiscount";
import { IProduct } from "./IProducts";

export interface IOrderDetailAddProduct {
  productId: number;
  quantity: number;
}

export interface IDeleteProduct {
  detailId: string;
}

export interface IOrder {
  status: string;
  totalOrder: number;
  originalTotal?: number;
  discountAmmount?: number;
  IsShipment: boolean;
  orderId: string;
  createdAt: string;
  orderDetails: IOrderDetail[];
  discount?: IDiscount;
  IAddress?: IAddress;
}
export interface IOrderDetail {
  orderDetailId: string;
  quantity: number;
  product: IProduct;
}
