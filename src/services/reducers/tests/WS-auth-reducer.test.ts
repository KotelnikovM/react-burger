import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_ORDERS,
} from '../../actions/WS-auth-action';
import { initialState, wsAuthReducer } from '../WS-auth-reducer';

const order = {
  createdAt: '2000-04-25',
  ingredients: ['bun', 'sauce'],
  name: 'my order',
  number: 4000,
  status: 'ready',
  updatedAt: '2000-04-26',
  _id: 'qwfdqwfk123124124',
};

export const mainOrders = {
  success: true,
  total: 2,
  totalToday: 2,
  orders: [order, order],
};

describe('Redux WS auth reducer', () => {
  it('Should be success WS_AUTH_CONNECTION_SUCCESS action', () => {
    expect(
      wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_SUCCESS })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      orders: [],
    });
  });

  it('Should be success WS_AUTH_CONNECTION_ERROR action', () => {
    expect(
      wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_ERROR })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('Should be success WS_AUTH_CONNECTION_CLOSED action', () => {
    expect(
      wsAuthReducer(undefined, { type: WS_AUTH_CONNECTION_CLOSED })
    ).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('Should be success WS_AUTH_GET_ORDERS action', () => {
    expect(
      wsAuthReducer(undefined, {
        type: WS_AUTH_GET_ORDERS,
        payload: mainOrders,
      })
    ).toEqual({
      ...initialState,
      orders: mainOrders.orders,
    });
  });
});
