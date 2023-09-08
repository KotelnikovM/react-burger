import { IIngredient } from '../../../utils/types';
import {
  INGREDIENT_DETAILS_CLOSE,
  INGREDIENT_DETAILS_OPEN,
  ORDER_DETAILS_CLOSE,
  ORDER_DETAILS_OPEN,
} from '../../constants/ingredient-details-constants';
import ingredientDetailsReducer, {
  initialState,
} from '../ingredient-details-reducer';

const ingredient: IIngredient = {
  _id: '60d3b41abdacab0026a733c6',
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

describe('Redux ingredient details reducer', () => {
  it('Should be success INGREDIENT_DETAILS_OPEN action', () => {
    expect(
      ingredientDetailsReducer(undefined, {
        type: INGREDIENT_DETAILS_OPEN,
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      isOpenedIngredientDetails: true,
      infoOfIngredient: ingredient,
    });
  });

  it('Should be success INGREDIENT_DETAILS_CLOSE action', () => {
    expect(
      ingredientDetailsReducer(undefined, {
        type: INGREDIENT_DETAILS_CLOSE,
      })
    ).toEqual({
      ...initialState,
      isOpenedIngredientDetails: false,
    });
  });

  it('Should be success ORDER_DETAILS_OPEN action', () => {
    expect(
      ingredientDetailsReducer(undefined, { type: ORDER_DETAILS_OPEN })
    ).toEqual({
      ...initialState,
      isOpenedOrderDetails: true,
    });
  });

  it('Should be success ORDER_DETAILS_CLOSE action', () => {
    expect(
      ingredientDetailsReducer(undefined, { type: ORDER_DETAILS_CLOSE })
    ).toEqual({
      ...initialState,
      isOpenedIngredientDetails: false,
    });
  });
});
