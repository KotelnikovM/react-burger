import { RootState } from '../services/store';

export const getAuthChecked = (store: RootState) => store.auth.isAuthChecked;
export const getAuthUser = (store: RootState) => store.auth.user;
export const getBurgerIngredient = (store: RootState) => store.burgerIngredient;
export const getWsOrders = (store: RootState) => store.ws.orders;
export const getWsAuthOrders = (store: RootState) => store.wsAuth.orders;
export const getWs = (store: RootState) => store.ws;
export const getAuth = (store: RootState) => store.auth;
export const getWsAuth = (store: RootState) => store.wsAuth;
