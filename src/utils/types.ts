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
import { TWSAuthActions } from '../services/actions/WS-auth-action';
import { TWSActions } from '../services/actions/WS-action';

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

export interface IWSMiddlewareActions {
  wsInit: string;
  wsSendMessage: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

export interface IFeed {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFeedResponse {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Array<IFeed>;
}

type TApplicationActions =
  | TOrderActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TBurgerConstructorActions
  | TRegisterActions
  | TUserActions
  | TWSAuthActions
  | TWSActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch<TReturnType = void> = (
  action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;

// export type AppDispatch = Dispatch<TApplicationActions>;

// @ts-ignore
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
