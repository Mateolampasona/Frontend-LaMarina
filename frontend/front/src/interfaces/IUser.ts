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
