import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { ingredientPropTypes } from '../../../utils/ingredientPropTypes';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { INGREDIENT_DETAILS_OPEN } from '../../../services/actions/ingredient-details-actions';
import { useDrag } from 'react-dnd/dist/hooks';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../utils/types';

const IngredientItem = ({ ...item }: IIngredient): JSX.Element => {
  const ID = uuid();

  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: item.type,
    item: { ID, ...item },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  const open = () => {
    dispatch({
      type: INGREDIENT_DETAILS_OPEN,
      payload: {
        ...item,
      },
    });
  };

  return (
    <>
      <div
        className={!isDrag ? styles.item : styles.itemIsDrag}
        onClick={() => {
          //@ts-ignore
          open(item.type);
        }}
        ref={dragRef}
      >
        <Link
          to={{ pathname: `/ingredients/${item._id}` }}
          state={{ background: location }}
          className={styles.link}
        >
          <img src={item.image} alt={item.name} />
          <div className={styles.priceAndIcon}>
            <p className="mr-2 mb-2 text text_type_digits-default">
              {item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">{item.name}</p>
          {item.count ? (
            <Counter
              count={item.count}
              size="default"
              extraClass={`${styles.counter} m-1`}
            />
          ) : null}
        </Link>
      </div>
    </>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes,
};

export default IngredientItem;
