// import { register } from '../../utils/norma-api';

import {
  fetchWithRefresh,
  NORMA_API,
  responseCheck,
} from '../../utils/norma-api';

export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED';

// export const register = async (name, email, password) => {
//   fetchWithRefresh(`${NORMA_API}/auth/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ name, email, password }),
//   });
//   // return await responseCheck(req);
// };

export const registerAction = (email, password, name) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_REGISTER_REQUEST });
    fetchWithRefresh(`${NORMA_API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
      .then((response) => {
        if (response && response.success) {
          localStorage.setItem(
            'accessToken',
            response.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', response.refreshToken);
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            payload: { user: response.user },
          });
        }
      })
      .catch(() => {
        dispatch({
          type: AUTH_REGISTER_FAILED,
        });
      });
  };
};
