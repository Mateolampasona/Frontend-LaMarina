import { IProduct } from "./IProducts"

export interface ICompra{
    compraId:string
    paymentMethod:string
    payment_preference_id:string
    purchaseDate:string
    purchaseDetails:ICompraDetail[]
    status:string
    total:number
}
export interface ICompraDetail{
    product: IProduct
    quantity:number
    subtotal:number
}