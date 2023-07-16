import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth-reducer';
import { burgerConstructorReducer } from './reducers/burger-constructor-reducer';
import { burgerIngredientReducer } from './reducers/burger-ingredients-reducer';
import ingredientDetailsReducer from './reducers/ingredient-details-reducer';
import { orderReducer } from './reducers/order-reducer';
import { wsAuthReducer } from './reducers/WS-auth-reducer';
import { wsReducer } from './reducers/WS-reducer';

export const rootReducer = combineReducers({
  burgerIngredient: burgerIngredientReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  ws: wsReducer,
  wsAuth: wsAuthReducer,
});
