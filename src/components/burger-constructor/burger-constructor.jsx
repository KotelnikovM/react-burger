import { useState, useCallback, useMemo } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import '../../index.css';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_DETAILS_OPEN } from '../../services/actions/ingredient-details-actions';
import { BurgerConstructorItem } from './burger-constructor-item/burger-constructor-item';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  updateIngredients,
} from '../../services/actions/burger-constructor-actions';
import Bun from './bun/bun';
import { getNumberOfOrder } from '../../services/actions/order-actions';
import { INCREMENT_BURGER_INGREDIENT_COUNT } from '../../services/actions/burger-ingredients-actions';
import { NotAuthDetails } from '../modal/not-auth-details/not-auth-details';

const BurgerConstructor = () => {
  const [isNotAuth, setIsNotAuth] = useState(false);
  const dispatch = useDispatch();
  const isOpened = useSelector(
    (state) => state.ingredientDetails.isOpenedOrderDetails
  );
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const user = useSelector((state) => state.auth.user);

  const onHandleDropMains = (item) => {
    dispatch({
      type: ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
      payload: { ...item },
    });
    dispatch({
      type: INCREMENT_BURGER_INGREDIENT_COUNT,
      payload: { itemId: item._id },
    });
  };

  const [, dropMains] = useDrop({
    accept: ['main', 'sauce'],
    drop(item) {
      onHandleDropMains(item);
    },
  });

  const moveIngredients = useCallback(
    (dragIndex, hoverIndex) => {
      const dragIngredient = ingredients[dragIndex];
      const newIngredients = [...ingredients];
      newIngredients.splice(dragIndex, 1);
      newIngredients.splice(hoverIndex, 0, dragIngredient);

      dispatch(updateIngredients(newIngredients));
    },
    [dispatch, ingredients]
  );

  const totalPrice = useMemo(() => {
    return (
      ingredients.reduce((acc, item) => acc + item.price, 0) +
      Number(bun ? bun?.price : 0) * 2
    );
  }, [ingredients, bun]);

  const orderIngredients = useMemo(() => {
    let orderIngredientsIds = [];

    if (bun) {
      orderIngredientsIds.push(bun._id, bun._id);
    }

    if (ingredients.length) {
      ingredients.forEach((ingredient) => {
        orderIngredientsIds.push(ingredient._id);
      });
    }

    return orderIngredientsIds;
  }, [bun, ingredients]);

  const onClickOrder = () => {
    if (user) {
      setIsNotAuth(false);
      dispatch({ type: ORDER_DETAILS_OPEN });
      dispatch(getNumberOfOrder(orderIngredients));
    } else {
      setIsNotAuth(true);
    }
  };

  return (
    <div className={styles.burgerConstructor}>
      <div className={styles.burgerConstructorItems}>
        <Bun bun={bun} coordinate="top" position="(верх)" />
        {ingredients.length > 0 ? (
          <div className={styles.fillings} ref={dropMains}>
            {ingredients.map(
              (ingredient, index) =>
                ingredient.type !== 'bun' && (
                  <BurgerConstructorItem
                    key={ingredient.ID}
                    ID={ingredient.ID}
                    image={ingredient.image}
                    name={ingredient.name}
                    price={ingredient.price}
                    index={index}
                    itemId={ingredient._id}
                    moveIngredients={moveIngredients}
                  />
                )
            )}
          </div>
        ) : (
          <div ref={dropMains} className={`ml-6 `}>
            <div
              style={{
                width: '536px',
                textAlign: 'center',
              }}
              className="constructor-element "
            >
              <span
                style={{
                  transform: 'translateY(50%)',
                }}
                className="constructor-element__text"
              >
                Выбери начинку
              </span>
            </div>
          </div>
        )}
        <Bun bun={bun} coordinate="bottom" position="(низ)" />
      </div>
      <div className={styles.allPriceAndButton}>
        <div className={styles.allPrice}>
          <p className="text text_type_digits-medium">
            {!totalPrice ? 0 : totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <>
          {bun && ingredients.length > 0 && (
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onClickOrder}
            >
              Оформить заказ
            </Button>
          )}

          {isOpened && (
            <>
              <Modal>
                <OrderDetails />
              </Modal>
            </>
          )}
        </>
        {isNotAuth && (
          <Modal>
            <NotAuthDetails />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;
