import { useState } from 'react';

import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { ingredientPropTypes } from '../../types/ingredientPropTypes';

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('buns');

  return (
    <div>
      <div className={styles.burgerIngredientsTabs}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
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
        <p className="text text_type_main-medium">Булки</p>
        <IngredientsGroup data={data.filter((item) => item.type === 'bun')} />
        <p className="text text_type_main-medium">Соусы</p>
        <IngredientsGroup data={data.filter((item) => item.type === 'sauce')} />
        <p className="text text_type_main-medium">Начинки</p>
        <IngredientsGroup data={data.filter((item) => item.type === 'main')} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
