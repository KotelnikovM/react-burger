import { combineReducers } from 'redux';
import { burgerIngredientReducer } from './reducers/burger-ingredients-reducer';

export const rootReducer = combineReducers({
  burgerIngredient: burgerIngredientReducer,
});
