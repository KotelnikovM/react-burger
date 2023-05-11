import { IIngredient } from '../../utils/types';
import { TIngredientDetailsActions } from '../actions/ingredient-details-actions';
import {
  INGREDIENT_DETAILS_CLOSE,
  INGREDIENT_DETAILS_OPEN,
  ORDER_DETAILS_CLOSE,
  ORDER_DETAILS_OPEN,
} from '../constants/ingredient-details-constants';

type TIngredientDetailsState = {
  infoOfIngredient: IIngredient | {};
  isOpenedIngredientDetails: boolean;
  isOpenedOrderDetails: boolean;
};

const initialState: TIngredientDetailsState = {
  infoOfIngredient: {},
  isOpenedIngredientDetails: false,
  isOpenedOrderDetails: false,
};

const ingredientDetailsReducer = (
  state = initialState,
  action: TIngredientDetailsActions
) => {
  switch (action.type) {
    case INGREDIENT_DETAILS_OPEN: {
      return {
        ...state,
        isOpenedIngredientDetails: true,
        infoOfIngredient: action.payload,
      };
    }

    case INGREDIENT_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenedIngredientDetails: false,
      };
    }

    case ORDER_DETAILS_OPEN: {
      return {
        ...state,
        isOpenedOrderDetails: true,
      };
    }

    case ORDER_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenedOrderDetails: false,
      };
    }

    default:
      return state;
  }
};

export default ingredientDetailsReducer;
