import { IIngredient } from '../../utils/types';
import {
  INGREDIENT_DETAILS_CLOSE,
  INGREDIENT_DETAILS_OPEN,
  ORDER_DETAILS_CLOSE,
  ORDER_DETAILS_OPEN,
} from '../constants/ingredient-details-constants';

export interface IIngredientDetailsOpen {
  readonly type: typeof INGREDIENT_DETAILS_OPEN;
  readonly payload?: boolean | IIngredient;
}

export interface IIngredientDetailsClose {
  readonly type: typeof INGREDIENT_DETAILS_CLOSE;
}

export interface IOrderDetailsOpen {
  readonly type: typeof ORDER_DETAILS_OPEN;
}

export interface IOrderDetailsClose {
  readonly type: typeof ORDER_DETAILS_CLOSE;
}

export type TIngredientDetailsActions =
  | IIngredientDetailsOpen
  | IIngredientDetailsClose
  | IOrderDetailsOpen
  | IOrderDetailsClose;

export const ingredientDetailsOpen = (
  ingredient: IIngredient
): IIngredientDetailsOpen => {
  return {
    type: INGREDIENT_DETAILS_OPEN,
    payload: ingredient,
  };
};
