import {
  IIngredientsResponse,
  IOrderResponce,
  IRefreshTokenResponse,
  IUserResponce,
  TOptions,
} from './types';

export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const checkResponse = <T>(response: Response) =>
  response.ok
    ? (response.json() as Promise<T>)
    : response.json().then((error: Error) => Promise.reject(error));

// export const getIngredients = () => {
//   return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
// };

export const getIngredients = async (): Promise<IIngredientsResponse> => {
  try {
    const res = await fetch(`${NORMA_API}/ingredients`);
    return await checkResponse<IIngredientsResponse>(res);
  } catch (err) {
    throw new Error('Что-то пошло не так(');
  }
};

export const postOrder = async (ingredients: Array<string>) => {
  try {
    const req = await fetch(
      `${NORMA_API}/orders?token=${localStorage.getItem('accessToken')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ingredients }),
      }
    );

    return await checkResponse<IOrderResponce>(req);
  } catch (error) {
    throw new Error('Что-то пошло не так(');
  }
};

export const refreshToken = <T>(): Promise<T> =>
  fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
    //@ts-ignore
  }).then(checkResponse<T>);

export const fetchWithRefresh = async (
  url: string,
  options: TOptions
): Promise<IUserResponce | IRefreshTokenResponse> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    const err = error as Error;
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken<IUserResponce>();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return checkResponse<IRefreshTokenResponse>(res);
    }
    return Promise.reject(err);
  }
};
