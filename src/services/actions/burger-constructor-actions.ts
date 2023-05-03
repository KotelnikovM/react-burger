import { IIngredient } from '../../utils/types';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
  UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
  UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../constants/burger-constructor-constants';

export interface IUpgradeIngredientsAction {
  readonly type: typeof UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  readonly payload?: IIngredient[];
}

export interface IAddIngredientToBurgerConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR;
  readonly payload: IIngredient;
}

export interface IDeleteIngredientFromBurgerConstructorAction {
  readonly type: typeof DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR;
  readonly payload?: Pick<IIngredient, 'ID'>;
}

export interface IUpdateBunInBurgerConstructorAction {
  readonly type: typeof UPDATE_BUN_IN_BURGER_CONSTRUCTOR;
  readonly payload?: IIngredient[];
  readonly isBun?: boolean;
}

export type TBurgerConstructorActions =
  | IUpgradeIngredientsAction
  | IAddIngredientToBurgerConstructorAction
  | IDeleteIngredientFromBurgerConstructorAction
  | IUpdateBunInBurgerConstructorAction;

export const updateIngredients = (
  ingredients: IIngredient[]
): IUpgradeIngredientsAction => {
  return {
    type: UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
    payload: ingredients,
  };
};
