import { getUser, login } from '../../actions/user-actions';
import {
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from '../../constants/register-constants';
import {
  AUTH_CHECKED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_FAILED,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILED,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  PATCH_USER_REQUEST,
  PATCH_USER_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  SET_EMAIL_CORRECT_FLAG,
  SET_USER,
  USER_REQUEST,
  USER_REQUEST_FAILED,
} from '../../constants/user-constants';
import { configureStore } from '@reduxjs/toolkit';
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
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('Should set loading status', () => {
    expect(
      authReducer(
        undefined,
        { type: AUTH_REGISTER_REQUEST } && { type: USER_REQUEST } && {
            type: LOGOUT_REQUEST,
          } && { type: LOGIN_REQUEST } && { type: PATCH_USER_REQUEST } && {
            type: FORGOT_PASSWORD_REQUEST,
          }
      )
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Should be success getUser action', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: testNameEmailObj,
            success: true,
          }),
          ok: true,
        })
      )
    );

    await store.dispatch(getUser());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: testNameEmailObj,
      isLoading: false,
    });
  });

  it('Should be fail getUser action', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(jest.fn(() => Promise.reject()));

    await store.dispatch(getUser());

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      isError: true,
      isLoading: false,
    });
  });

  it('Should be success login action', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => ({
            user: testNameEmailObj,
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            success: true,
          }),
          ok: true,
        })
      )
    );

    await store.dispatch(
      login({
        email: 'test@gmail.com',
        password: 'password',
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      user: testNameEmailObj,
      isAuthChecked: true,
    });
  });

  it('Should be fail login action', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(jest.fn(() => Promise.reject()));

    await store.dispatch(
      login({
        email: 'test@gmail.com',
        password: 'password',
      })
    );

    expect(fetch).toBeCalledTimes(1);

    expect(store.getState()).toEqual({
      ...initialState,
      isError: true,
      isLoading: false,
    });
  });

  it('Should set user data', () => {
    expect(
      authReducer(
        undefined,
        {
          type: AUTH_REGISTER_SUCCESS,
          payload: testFullObj,
        } && {
          type: LOGIN_REQUEST_SUCCESS,
          payload: testFullObj,
        }
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: false,
      isAuthChecked: true,
      user: testFullObj,
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

  it('Should auth request failed', () => {
    expect(authReducer(undefined, { type: AUTH_REGISTER_FAILED })).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      isAuthChecked: true,
    });
  });

  it('Should user request failed', () => {
    expect(
      authReducer(
        undefined,
        { type: USER_REQUEST_FAILED } && { type: LOGOUT_REQUEST_FAILED } && {
            type: LOGIN_REQUEST_FAILED,
          } && { type: PATCH_USER_REQUEST_FAILED } && {
            type: FORGOT_PASSWORD_REQUEST_FAILED,
          } && { type: RESET_PASSWORD_REQUEST_FAILED }
      )
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  it('Should check auth', () => {
    expect(authReducer(undefined, { type: AUTH_CHECKED })).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('Should logout request success', () => {
    expect(authReducer(undefined, { type: LOGOUT_REQUEST_SUCCESS })).toEqual({
      ...initialState,
      isLoading: false,
    });
  });

  it('Should set email correct flag', () => {
    expect(authReducer(undefined, { type: SET_EMAIL_CORRECT_FLAG })).toEqual({
      ...initialState,
      isCorrectEmail: true,
    });
  });

  it('Should reset password request success', () => {
    expect(
      authReducer(undefined, {
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: testFullObj,
      })
    ).toEqual({
      ...initialState,
      user: testFullObj,
    });
  });
});
