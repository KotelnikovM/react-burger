import { IIngredient } from '../../utils/types';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients-actions';
import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS,
  DECREMENT_BURGER_INGREDIENT_COUNT,
  INCREMENT_BURGER_INGREDIENT_COUNT,
  UPDATE_BUN_COUNT,
} from '../constants/burger-ingredients-constants';

type TBurgerIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  ingredients: IIngredient[];
};

const initialState: TBurgerIngredientsState = {
  isLoading: false,
  hasError: false,
  ingredients: [],
};

export const burgerIngredientReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredients: action.payload,
      };
    }
    case BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        ingredients: [],
      };
    }

    case UPDATE_BUN_COUNT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,

          state.ingredients.map((ingredient) =>
            ingredient._id === action.payload.itemId
              ? (ingredient.count = 2)
              : ingredient.type === 'bun'
              ? (ingredient.count = 0)
              : ingredient.count
          ),
        ],
      };
    }

    case INCREMENT_BURGER_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,

          state.ingredients.map((ingredient) =>
            ingredient._id === action.payload.itemId
              ? !ingredient.count
                ? (ingredient.count = 1)
                : (ingredient.count += 1)
              : ingredient.count
          ),
        ],
      };
    }

    case DECREMENT_BURGER_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,

          state.ingredients.map((ingredient) =>
            ingredient._id === action.payload.itemId
              ? !ingredient.count
                ? (ingredient.count = 1)
                : ingredient.count--
              : ingredient.count
          ),
        ],
      };
    }

    default: {
      return state;
    }
  }
};
