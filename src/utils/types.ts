export type TOptions = RequestInit & {
  headers: {
    authorization: string;
  };
};

export interface IUser {
  email: string;
  name: string;
}

export interface IIngredient {
  ID?: string;
  count?: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: string;
  _id: string;
}

export interface IIngredientsResponse {
  data: Array<IIngredient>;
  success: boolean;
}

export interface IRefreshTokenResponse {
  message: string;
  success: boolean;
  refreshToken: string;
}

export interface IUserResponce {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
  message: string;
}
