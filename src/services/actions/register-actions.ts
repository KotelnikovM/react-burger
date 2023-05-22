import { fetchWithRefresh, NORMA_API } from '../../utils/norma-api';
import { AppDispatch, IUser } from '../../utils/types';
import {
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from '../constants/register-constants';

export interface IAuthRegisterRequest {
  readonly type: typeof AUTH_REGISTER_REQUEST;
}

export interface IAuthRegisterSuccess {
  readonly type: typeof AUTH_REGISTER_SUCCESS;
  readonly payload?: IUser;
}

export interface IAuthRegisterFailed {
  readonly type: typeof AUTH_REGISTER_FAILED;
}

export type TRegisterActions =
  | IAuthRegisterRequest
  | IAuthRegisterSuccess
  | IAuthRegisterFailed;

export const registerAction = ({ email, password, name }: IUser) => {
  return async (dispatch: AppDispatch): Promise<void> => {
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
            payload: response.user,
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
