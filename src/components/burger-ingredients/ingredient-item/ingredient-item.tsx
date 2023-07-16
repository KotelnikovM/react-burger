import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { v4 as uuid } from 'uuid';
import { useDrag } from 'react-dnd/dist/hooks';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../../utils/types';
import { ingredientDetailsOpen } from '../../../services/actions/ingredient-details-actions';

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

  return (
    <>
      <div
        className={!isDrag ? styles.item : styles.itemIsDrag}
        onClick={() => {
          ingredientDetailsOpen({ ...item });
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

export default IngredientItem;
