export type TOptions = RequestInit & {
  headers: {
    authorization: string;
  };
};

export interface IUser {
  email: string;
  name: string;
}

// calories: PropTypes.number.isRequired,
// carbohydrates: PropTypes.number.isRequired,
// fat: PropTypes.number.isRequired,
// image: PropTypes.string.isRequired,
// image_large: PropTypes.string.isRequired,
// image_mobile: PropTypes.string.isRequired,
// name: PropTypes.string.isRequired,
// price: PropTypes.number.isRequired,
// proteins: PropTypes.number.isRequired,
// type: PropTypes.string.isRequired,
// __v: PropTypes.number.isRequired,
// _id: PropTypes.string.isRequired,
// });
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
