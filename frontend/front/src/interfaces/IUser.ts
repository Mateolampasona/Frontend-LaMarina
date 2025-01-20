import { ICompra } from "./ICompra";
import { IFavorite } from "./IFavorite";

export interface IModifyUser {
  email?: string;

  name?: string;

  password?: string;
}

export interface ICreateUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface IBanUser {
  banreason: string;
}

export interface IUser {
  authProvider: string;
  createdAt: Date;
  email: string;
  idBanned: boolean;
  name: string;
  role: string;
  userId: number;
  compras: ICompra[];
  favorites: IFavorite[];
}
