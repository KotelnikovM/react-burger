import { TOrderActions } from '../actions/order-actions';
import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from '../constants/order-constants';

type TOrderState = {
  isLoading: boolean;
  hasError: boolean;
  number: number | null;
};

export const initialState: TOrderState = {
  isLoading: false,
  hasError: false,
  number: null,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        number: action.payload,
      };
    }
    case ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        number: null,
      };
    }

    default: {
      return state;
    }
  }
};
