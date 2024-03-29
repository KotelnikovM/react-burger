import { IIngredient } from '../../utils/types';
import { TBurgerConstructorActions } from '../actions/burger-constructor-actions';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  CLEAR_BURGER_CONSTRUCTOR_STATE,
  DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
  UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
  UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../constants/burger-constructor-constants';

type TBurgerConstructorState = {
  bun: IIngredient | null;
  ingredients: ReadonlyArray<IIngredient>;
};

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        ingredients:
          action.payload.type !== 'bun'
            ? [...state.ingredients, action.payload]
            : state.ingredients,
      };
    }

    case DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter(
            (ingredient) => ingredient.ID !== action.payload
          ),
        ],
      };
    }

    case UPDATE_BUN_IN_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.isBun ? action.payload : state.bun,
      };
    }

    case UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: action.payload,
      };
    }

    case CLEAR_BURGER_CONSTRUCTOR_STATE: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};
