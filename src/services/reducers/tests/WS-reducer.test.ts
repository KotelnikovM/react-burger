import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
} from '../../actions/WS-action';
import { initialState, wsReducer } from '../WS-reducer';
import { mainOrders } from './WS-auth-reducer.test';

describe('Redux ws reducer', () => {
  it('Should be success WS_CONNECTION_SUCCESS action', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      wsConnected: true,
    });
  });

  it('Should be success WS_CONNECTION_ERROR action', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_ERROR })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('Should be success WS_CONNECTION_CLOSED action', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      wsConnected: false,
    });
  });

  it('Should be success WS_GET_ORDERS action', () => {
    expect(
      wsReducer(undefined, { type: WS_GET_ORDERS, payload: mainOrders })
    ).toEqual({
      ...initialState,
      orders: mainOrders.orders,
      total: mainOrders.total,
      totalToday: mainOrders.totalToday,
    });
  });
});
