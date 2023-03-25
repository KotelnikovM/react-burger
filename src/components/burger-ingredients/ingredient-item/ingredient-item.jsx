import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { ingredientPropTypes } from '../../../utils/ingredientPropTypes';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { INGREDIENT_DETAILS_OPEN } from '../../../services/actions/ingredient-details-actions';
import {
  ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
  UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
} from '../../../services/actions/burger-constructor-actions';
import { useDrag } from 'react-dnd/dist/hooks';

const IngredientItem = ({ item }) => {
  const ID = uuid();

  const [{ isDrag }, dragRef] = useDrag({
    type: item.type,
    item: { ID, ...item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  const open = (typeOfIngredient) => {
    dispatch({
      type: INGREDIENT_DETAILS_OPEN,
      payload: {
        ...item,
      },
    });

    typeOfIngredient === 'bun'
      ? dispatch({
          type: UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
          payload: {
            ID,
            ...item,
          },
          isBun: true,
        })
      : dispatch({
          type: ADD_INGREDIENT_TO_BURGER_CONSTRUCTOR,
          payload: {
            ID,
            ...item,
          },
        });
  };

  return (
    <>
      <div
        className={!isDrag ? styles.item : styles.itemIsDrag}
        onClick={() => {
          open(item.type);
        }}
        ref={dragRef}
      >
        <img src={item.image} alt={item.name} />
        <div className={styles.priceAndIcon}>
          <p className="mr-2 mb-2 text text_type_digits-default">
            {item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
        <Counter
          className={styles.counter}
          count={1}
          size="default"
          extraClass="m-1"
        />
      </div>
    </>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes,
};

export default IngredientItem;
