import { fetchWithRefresh, NORMA_API } from '../../utils/norma-api';

export const AUTH_CHECKED = 'AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const USER_REQUEST = 'USER_REQUEST';
export const USER_REQUEST_FAILED = 'USER_REQUEST_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_REQUEST_SUCCESS = 'LOGOUT_REQUEST_SUCCESS';
export const LOGOUT_REQUEST_FAILED = 'LOGOUT_REQUEST_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_REQUEST_FAILED = 'PATCH_USER_REQUEST_FAILED';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const SET_EMAIL_CORRECT_FLAG = 'SET_EMAIL_CORRECT_FLAG';
export const FORGOT_PASSWORD_REQUEST_FAILED = 'FORGOT_PASSWORD_REQUEST_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_REQUEST_SUCCESS = 'RESET_PASSWORD_REQUEST_SUCCESS';
export const RESET_PASSWORD_REQUEST_FAILED = 'RESET_PASSWORD_REQUEST_FAILED';

export const getUser = () => {
  return (dispatch) => {
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

// export const getLogin = async (email, password) => {
//   try {
//     const req = await fetch(`${NORMA_API}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
//     return await responseCheck(req);
//   } catch (error) {
//     throw new Error('Что-то пошло не так(');
//   }
// };

export const login = (email, password) => {
  return (dispatch) => {
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
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    fetch(`${NORMA_API}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then((res) => {
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

export const patchUser = (email, password, name) => {
  return (dispatch) => {
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

export const passwordForgot = (email) => {
  return async (dispatch) => {
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

export const passwordReset = (password, token) => async (dispatch) => {
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
  return fetch(`${NORMA_API}/password-reset/reset`, options)
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
  return (dispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser())
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
