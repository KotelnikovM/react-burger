import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TBurgerConstructorActions } from '../services/actions/burger-constructor-actions';
import { TBurgerIngredientsActions } from '../services/actions/burger-ingredients-actions';
import { TIngredientDetailsActions } from '../services/actions/ingredient-details-actions';
import { TOrderActions } from '../services/actions/order-actions';
import { TRegisterActions } from '../services/actions/register-actions';
import { RootState } from '../services/store';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { TUserActions } from '../services/actions/user-actions';

export type TOptions = RequestInit & {
  headers: {
    authorization?: string;
  };
};

export interface IUser {
  email?: string;
  name?: string;
  password?: string;
  token?: string;
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
  accessToken: string;
  user?: IUser;
}

export interface IUserResponce {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
  message: string;
}

export interface IOrderResponce {
  success: boolean;
  order: { number: number };
  name: string;
}

export interface IRegisterResponse {
  email: string;
  password: string;
  name: string;
}

type TApplicationActions =
  | TOrderActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TBurgerConstructorActions
  | TRegisterActions
  | TUserActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

// export type AppDispatch<TReturnType = void> = (
//   action: TApplicationActions | AppThunk<TReturnType>
// ) => TReturnType

export type AppDispatch = Dispatch<TApplicationActions>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
