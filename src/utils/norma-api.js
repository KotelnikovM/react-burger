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
