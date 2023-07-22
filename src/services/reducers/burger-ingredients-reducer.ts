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

export const initialState: TBurgerIngredientsState = {
  isLoading: false,
  hasError: false,
  ingredients: [],
};

export const burgerIngredientReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
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
      const ingredients = state.ingredients.map((ingredient) => {
        if (ingredient._id === action.payload.itemId) {
          return {
            ...ingredient,
            count: (ingredient.count = 2),
          };
        } else if (ingredient.type === 'bun') {
          return {
            ...ingredient,
            count: (ingredient.count = 0),
          };
        } else {
          return ingredient;
        }
      });
      return {
        ...state,
        ingredients,
      };
    }

    case INCREMENT_BURGER_INGREDIENT_COUNT: {
      const ingredients = state.ingredients.map((ingredient) => {
        if (ingredient._id === action.payload.itemId) {
          if (!ingredient.count) {
            return {
              ...ingredient,
              count: 1,
            };
          } else {
            return {
              ...ingredient,
              count: (ingredient.count += 1),
            };
          }
        } else {
          return ingredient;
        }
      });
      return {
        ...state,
        ingredients,
      };
    }

    case DECREMENT_BURGER_INGREDIENT_COUNT: {
      const ingredients = state.ingredients.map((ingredient) => {
        if (ingredient._id === action.payload.itemId) {
          if (!ingredient.count) {
            return {
              ...ingredient,
              count: 1,
            };
          } else {
            return {
              ...ingredient,
              count: (ingredient.count -= 1),
            };
          }
        } else {
          return ingredient;
        }
      });
      return {
        ...state,
        ingredients,
      };
    }

    default: {
      return state;
    }
  }
};
