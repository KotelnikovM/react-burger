import { useState } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';
import { ingredientPropTypes } from '../../../utils/ingredientPropTypes';

const IngredientItem = ({ item }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div
        className={styles.item}
        onClick={() => {
          setModalActive(true);
        }}
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

      {modalActive && (
        <Modal setActive={setModalActive}>
          <IngredientDetails item={item} setActive={setModalActive} />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes,
};

export default IngredientItem;
