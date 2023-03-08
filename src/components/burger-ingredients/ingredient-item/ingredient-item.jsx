import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import Modal from '../../modal/modal';
import IngredientDetails from '../../modal/ingredient-details/ingredient-details';

const IngredientItem = ({ item }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div className={styles.item} onClick={() => setModalActive(true)}>
        <img src={item.image} alt={item.name} />
        <div className={styles.priceAndIcon}>
          <p className="mr-2 mb-2 text text_type_digits-default">
            {item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p style={{ fontSize: '16px' }} className="text text_type_main-default">
          {item.name}
        </p>
        <Counter
          className={styles.counter}
          count={1}
          size="default"
          extraClass="m-1"
        />
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails {...item} setActive={setModalActive} />
      </Modal>
    </>
  );
};

IngredientItem.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export default IngredientItem;
