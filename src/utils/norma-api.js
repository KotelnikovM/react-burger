export const NORMA_API = 'https://norma.nomoreparties.space/api';

export const responseCheck = (response) => {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error));
};

export const getIngredients = () => {
  return fetch(`${NORMA_API}/ingredients`)
    .then(responseCheck)
    .catch((error) => console.log(error));
};

export const postOrder = async (ingredients) => {
  // fetchWithRefresh(`${NORMA_API}/orders`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ ingredients }),
  // });
  try {
    const req = await fetch(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });
    return await responseCheck(req);
  } catch (error) {
    throw new Error('Что-то пошло не так(');
  }
};

// export const register = async (name, email, password) => {
//   try {
//     const req = await fetch(`${NORMA_API}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });
//     return await responseCheck(req);
//   } catch (error) {
//     throw new Error('Что-то пошло не так(');
//   }
// };

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

export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(responseCheck);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await responseCheck(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return responseCheck(res);
    }
    return Promise.reject(err);
  }
};
