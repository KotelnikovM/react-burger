import { getIngredients } from '../../utils/norma-api';
import { AppDispatch, AppThunk, IIngredient } from '../../utils/types';
import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  DECREMENT_BURGER_INGREDIENT_COUNT,
  INCREMENT_BURGER_INGREDIENT_COUNT,
  UPDATE_BUN_COUNT,
} from '../constants/burger-ingredients-constants';

export interface IBurgerIngredientsRequest {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}

export interface IBurgerIngredientsSuccess {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IBurgerIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}

export interface IUpdateBunCount {
  readonly type: typeof UPDATE_BUN_COUNT;
  readonly payload: { itemId: string };
}

export interface IIncrementBurgerIngredientCount {
  readonly type: typeof INCREMENT_BURGER_INGREDIENT_COUNT;
  readonly payload: { itemId: string };
}

export interface IDecrementBurgerIngredientCount {
  readonly type: typeof DECREMENT_BURGER_INGREDIENT_COUNT;
  readonly payload: { itemId: string };
}

export type TBurgerIngredientsActions =
  | IBurgerIngredientsRequest
  | IBurgerIngredientsSuccess
  | IBurgerIngredientsFailed
  | IUpdateBunCount
  | IIncrementBurgerIngredientCount
  | IDecrementBurgerIngredientCount;

export const getBurgerIngredients = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: BURGER_INGREDIENTS_REQUEST });
    getIngredients()
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: BURGER_INGREDIENTS_SUCCESS,
            payload: response.data,
          });
        }
      })
      .catch(() => {
        dispatch({ type: BURGER_INGREDIENTS_FAILED });
      });
  };
};
