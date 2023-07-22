import { getUser } from '../../actions/user-actions';
import {
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from '../../constants/register-constants';
import {
  AUTH_CHECKED,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  SET_USER,
  USER_REQUEST,
  USER_REQUEST_FAILED,
} from '../../constants/user-constants';
import { configureStore } from '../../store';
import { authReducer, initialState } from '../auth-reducer';

describe('Redux auth reducer', () => {
  let store = configureStore({
    reducer: authReducer,
    preloadedState: initialState,
  });

  const testFullObj = {
    email: 'test@gmail.com',
    password: 'password',
    name: 'user',
  };

  const testNameEmailObj = { email: 'test@gmail.com', name: 'user' };

  beforeEach(() => {
    store = configureStore({
      reducer: authReducer,
      preloadedState: initialState,
    });
  });

  afterEach(() => {
    jest.spyOn(global, 'fetch').mockClear();
  });

  it('Should return the initial state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('Should set loading status', () => {
    expect(
      authReducer(
        undefined,
        { type: AUTH_REGISTER_REQUEST } && { type: USER_REQUEST } && {
            type: LOGOUT_REQUEST,
          }
      )
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Should set user data', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_REGISTER_SUCCESS,
        payload: testFullObj,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      isAuthChecked: true,
      user: testFullObj,
    });
  });

  it('Should set register failed', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_REGISTER_FAILED,
        payload: { isAuthChecked: true },
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      isAuthChecked: true,
    });
  });

  it('Should set auth checked', () => {
    expect(
      authReducer(undefined, {
        type: AUTH_CHECKED,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('Should set user', () => {
    expect(
      authReducer(undefined, { type: SET_USER, payload: testFullObj })
    ).toEqual({
      ...initialState,
      user: testFullObj,
    });
  });

  it('Should user logout', () => {
    expect(authReducer(undefined, { type: LOGOUT_REQUEST_SUCCESS })).toEqual({
      ...initialState,
      user: null,
    });
  });
});
