import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('loafs');

  return (
    <div>
      <div style={{ display: 'flex' }} className="mb-10">
        <Tab value="loafs" active={current === 'loafs'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="fillings"
          active={current === 'fillings'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.wrap}>
        <p style={{ fontSize: '24px' }} className="text text_type_main-small">
          Булки
        </p>
        <IngredientsGroup data={data.filter((item) => item.type === 'bun')} />
        <p style={{ fontSize: '24px' }} className="text text_type_main-small">
          Соусы
        </p>
        <IngredientsGroup data={data.filter((item) => item.type === 'sauce')} />
        <p style={{ fontSize: '24px' }} className="text text_type_main-small">
          Начинки
        </p>
        <IngredientsGroup data={data.filter((item) => item.type === 'main')} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default BurgerIngredients;
