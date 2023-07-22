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
} from '../constants/user-constants';
import {
  AUTH_REGISTER_FAILED,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from '../constants/register-constants';
import { TUserActions } from '../actions/user-actions';
import { TRegisterActions } from '../actions/register-actions';
import { IUser } from '../../utils/types';

export type TAuthReducerInitialState = {
  isLoading: boolean;
  isError: boolean;
  user?: IUser | null;
  isAuthChecked: boolean;
  isCorrectEmail: boolean;
};

export const initialState: TAuthReducerInitialState = {
  isLoading: false,
  isError: false,
  user: null,
  isAuthChecked: false,
  isCorrectEmail: false,
};

type TAuthActions = TUserActions | TRegisterActions;

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuthChecked: true,
        user: action.payload,
      };
    }

    case AUTH_REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuthChecked: true,
      };
    }

    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case USER_REQUEST: {
      return { ...state, isLoading: true };
    }

    case USER_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOGOUT_REQUEST_SUCCESS: {
      return {
        ...state,
        user: null,
      };
    }

    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isAuthChecked: true,
        user: action.payload,
      };
    }

    case LOGIN_REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case PATCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case PATCH_USER_REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SET_EMAIL_CORRECT_FLAG: {
      return {
        ...state,
        isCorrectEmail: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
