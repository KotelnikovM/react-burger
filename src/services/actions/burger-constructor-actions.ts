import { IIngredient } from '../../utils/types';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  CLEAR_BURGER_CONSTRUCTOR_STATE,
  DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
  UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
  UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../constants/burger-constructor-constants';

export interface IUpgradeIngredientsAction {
  readonly type: typeof UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR;
  readonly payload: IIngredient[];
}

export interface IAddIngredientToBurgerConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR;
  readonly payload: IIngredient;
}

export interface IDeleteIngredientFromBurgerConstructorAction {
  readonly type: typeof DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR;
  readonly payload?: string;
}

export interface IUpdateBunInBurgerConstructorAction {
  readonly type: typeof UPDATE_BUN_IN_BURGER_CONSTRUCTOR;
  readonly payload: IIngredient;
  readonly isBun?: boolean;
}

export interface IClearBurgerConstructorState {
  readonly type: typeof CLEAR_BURGER_CONSTRUCTOR_STATE;
}

export type TBurgerConstructorActions =
  | IUpgradeIngredientsAction
  | IAddIngredientToBurgerConstructorAction
  | IDeleteIngredientFromBurgerConstructorAction
  | IUpdateBunInBurgerConstructorAction
  | IClearBurgerConstructorState;

export const updateIngredients = (
  ingredients: IIngredient[]
): IUpgradeIngredientsAction => {
  return {
    type: UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
    payload: ingredients,
  };
};

export const DeleteIngredientFromBurgerConstructor = (
  ID: string
): IDeleteIngredientFromBurgerConstructorAction => {
  return {
    type: DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
    payload: ID,
  };
};
