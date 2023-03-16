import { useMemo, useState } from 'react';

import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { ingredientPropTypes } from '../../types/ingredientPropTypes';

const BurgerIngredients = ({ data }) => {
  const Tabs = {
    BUNS: 'buns',
    SAUSES: 'sauses',
    MAINS: 'mains',
  };

  const [current, setCurrent] = useState(Tabs.BUNS);

  const buns = useMemo(
    () => data.filter((item) => item.type === 'bun'),
    [data]
  );

  const sauses = useMemo(
    () => data.filter((item) => item.type === 'sauce'),
    [data]
  );

  const mains = useMemo(
    () => data.filter((item) => item.type === 'main'),
    [data]
  );

  return (
    <div>
      <div className={styles.burgerIngredientsTabs}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.wrap}>
        <p className="text text_type_main-medium">Булки</p>
        <IngredientsGroup data={buns} />
        <p className="text text_type_main-medium">Соусы</p>
        <IngredientsGroup data={sauses} />
        <p className="text text_type_main-medium">Начинки</p>
        <IngredientsGroup data={mains} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
