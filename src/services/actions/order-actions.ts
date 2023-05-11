import { postOrder } from '../../utils/norma-api';
import { AppDispatch, AppThunk } from '../../utils/types';
import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from '../constants/order-constants';

export interface IOrderFailed {
  readonly type: typeof ORDER_FAILED;
}

export interface IOrderRequest {
  readonly type: typeof ORDER_REQUEST;
}

export interface IOrderSuccess {
  readonly type: typeof ORDER_SUCCESS;
  readonly payload: number;
}

export type TOrderActions = IOrderFailed | IOrderRequest | IOrderSuccess;

export const getNumberOfOrder = (orderIngredient: string[]): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ORDER_REQUEST });
    postOrder(orderIngredient)
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: ORDER_SUCCESS,
            payload: response.order.number,
          });
        }
      })
      .catch(() => {
        dispatch({ type: ORDER_FAILED });
      });
  };
};
