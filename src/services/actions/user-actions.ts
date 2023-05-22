import { fetchWithRefresh, NORMA_API } from '../../utils/norma-api';
import { AppDispatch, IUser } from '../../utils/types';
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
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  SET_EMAIL_CORRECT_FLAG,
  SET_USER,
  USER_REQUEST,
  USER_REQUEST_FAILED,
} from '../constants/user-constants';

// export const AUTH_CHECKED = 'AUTH_CHECKED';
// export const SET_USER = 'SET_USER';
// export const USER_REQUEST = 'USER_REQUEST';
// export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';
// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
// export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';
// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
// export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
// export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
// export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
// export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
// export const SET_EMAIL_CORRECT_FLAG = 'SET_EMAIL_CORRECT_FLAG';
// export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';
// export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
// export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
// export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED';

export type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginRequestSuccessAction = {
  readonly type: typeof LOGIN_REQUEST_SUCCESS;
  readonly isChecked: boolean;
  readonly payload?: IUser;
};

export type TLoginRequestFailed = {
  readonly type: typeof LOGIN_REQUEST_FAILED;
  readonly payload: string;
};

export type TUserRequest = {
  readonly type: typeof USER_REQUEST;
};

export type TSetUser = {
  readonly type: typeof SET_USER;
  readonly payload?: IUser | null;
};

export type TUserRequestFailed = {
  readonly type: typeof USER_REQUEST_FAILED;
  readonly payload?: string;
};

export type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};

export type TLogoutRequestSuccess = {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
};

export type TLogoutRequestFailed = {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
};

export type TPatchUserRequest = {
  readonly type: typeof PATCH_USER_REQUEST;
};

export type TPatchUserRequestFailed = {
  readonly type: typeof PATCH_USER_REQUEST_FAILED;
};

export type TForgotPasswordRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export type TSetEmailCorrectFlag = {
  readonly type: typeof SET_EMAIL_CORRECT_FLAG;
};

export type TForgotPasswordRequestFailed = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST_FAILED;
};

export type TResetPasswordRequest = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

export type TResetPasswordRequestSuccess = {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
  readonly payload?: IUser;
};

export type TResetPasswordRequestFailed = {
  readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
  readonly payload: string;
};

export type TAuthChecked = {
  readonly type: typeof AUTH_CHECKED;
  readonly payload: { isAuthChecked: boolean };
};

export type TUserActions =
  | TLoginRequestAction
  | TLoginRequestSuccessAction
  | TLoginRequestFailed
  | TUserRequest
  | TSetUser
  | TUserRequestFailed
  | TLogoutRequest
  | TLogoutRequestSuccess
  | TLogoutRequestFailed
  | TPatchUserRequest
  | TPatchUserRequestFailed
  | TForgotPasswordRequest
  | TSetEmailCorrectFlag
  | TForgotPasswordRequestFailed
  | TResetPasswordRequest
  | TResetPasswordRequestSuccess
  | TResetPasswordRequestFailed
  | TAuthChecked;

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: USER_REQUEST,
    });

    return fetchWithRefresh(`${NORMA_API}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        dispatch({ type: SET_USER, payload: res.user });
      })
      .catch((error) => {
        dispatch({
          type: USER_REQUEST_FAILED,
          payload: error.message,
        });
      });
  };
};

export const login = ({ email, password }: IUser) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    return fetchWithRefresh(`${NORMA_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res && res.success) {
          localStorage.setItem(
            'accessToken',
            res.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch({
            type: LOGIN_REQUEST_SUCCESS,
            isChecked: true,
            payload: res.user,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_REQUEST_FAILED,
          payload: error.message,
        });
      });
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    fetchWithRefresh(`${NORMA_API}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({ type: LOGOUT_REQUEST_SUCCESS });
        }
      })
      .catch((error) => {
        dispatch({ type: LOGOUT_REQUEST_FAILED, payload: error.message });
      });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
};

export const patchUser = ({ email, password, name }: IUser) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    fetchWithRefresh(`${NORMA_API}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: SET_USER, payload: res.user });
        }
      })
      .catch((error) => {
        dispatch({
          type: PATCH_USER_REQUEST_FAILED,
        });
      });
  };
};

export const passwordForgot = ({ email }: IUser) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    return fetch(`${NORMA_API}/password-reset`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        dispatch({
          type: SET_EMAIL_CORRECT_FLAG,
        });
      })
      .catch((e) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_FAILED,
        });
      });
  };
};

export const passwordReset =
  ({ password, token }: IUser) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    const options = {
      method: 'POST',
      body: JSON.stringify({ token, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetchWithRefresh(`${NORMA_API}/password-reset/reset`, options)
      .then((res) => {
        dispatch({
          type: SET_EMAIL_CORRECT_FLAG,
        });
        dispatch({
          type: RESET_PASSWORD_REQUEST_SUCCESS,
          payload: res.user,
        });
      })
      .catch((error) =>
        dispatch({
          type: RESET_PASSWORD_REQUEST_FAILED,
          payload: error.message,
        })
      );
  };

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem('accessToken')) {
      getUser()(dispatch)
        .catch((error) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({ type: SET_USER, payload: null });
        })
        .finally(() =>
          dispatch({ type: AUTH_CHECKED, payload: { isAuthChecked: true } })
        );
    } else {
      dispatch({ type: AUTH_CHECKED, payload: { isAuthChecked: true } });
    }
  };
};
