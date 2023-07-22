import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../../../utils/types';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  CLEAR_BURGER_CONSTRUCTOR_STATE,
  DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
  UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
  UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
} from '../../constants/burger-constructor-constants';
import {
  burgerConstructorReducer,
  initialState,
} from '../burger-constructor-reducer';

const uniqueId = uuidv4();

const ingredientFirst: IIngredient = {
  _id: '60d3b41abdacab0026a733c9',
  ID: uniqueId,
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  __v: '0',
};

const bun: IIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  ID: uniqueId,
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: '0',
};

describe('Redux burger constructor reducer', () => {
  it('should be success ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR action', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
        payload: ingredientFirst,
      })
    ).toEqual({
      ...initialState,
      ingredients: [{ ...ingredientFirst }],
    });
  });

  it('Should be success DELETE_INGREDIENT_FROM_CONSTRUCTOR action', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,

        payload: uniqueId,
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
    });
  });

  it('Should be success UPDATE_BUN_IN_CONSTRUCTOR action', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
        payload: bun,
        isBun: true,
      })
    ).toEqual({
      ...initialState,
      bun,
    });
  });

  it('Should be success UPDATE_INGREDIENTS action', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: UPDATE_INGREDIENTS_IN_BURGER_CONSTRUCTOR,
        payload: [ingredientFirst],
      })
    ).toEqual({
      ...initialState,
      ingredients: [ingredientFirst],
    });
  });

  it('Should success clear burger constructor state', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: CLEAR_BURGER_CONSTRUCTOR_STATE,
      })
    ).toEqual({ ...initialState });
  });
});
