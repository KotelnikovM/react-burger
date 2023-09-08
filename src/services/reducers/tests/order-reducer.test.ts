import {
  ORDER_FAILED,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from '../../constants/order-constants';
import { initialState, orderReducer } from '../order-reducer';

describe('Redux order reducer', () => {
  it('Should be success ORDER_REQUEST action', () => {
    expect(orderReducer(undefined, { type: ORDER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Should be success ORDER_SUCCESS action', () => {
    expect(
      orderReducer(undefined, { type: ORDER_SUCCESS, payload: 40000 })
    ).toEqual({
      ...initialState,
      isLoading: false,
      number: 40000,
    });
  });

  it('Should be success ORDER_FAILED action', () => {
    expect(orderReducer(undefined, { type: ORDER_FAILED })).toEqual({
      ...initialState,
      isLoading: false,
      hasError: true,
      number: null,
    });
  });
});
