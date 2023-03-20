import { useMemo, useState, useRef, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { ingredientPropTypes } from '../../utils/ingredientPropTypes';

const BurgerIngredients = ({ data }) => {
  const Tabs = {
    BUNS: 'buns',
    SAUCES: 'sauces',
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

  const tabsRef = useRef();
  const bunsRef = useRef();
  const sausesRef = useRef();
  const mainsRef = useRef();

  const tabSwitch = useCallback(() => {
    const calculationDifferences = (ref) =>
      Math.abs(
        tabsRef.current.getBoundingClientRect().bottom -
          ref.current.getBoundingClientRect().top
      );

    if (calculationDifferences(bunsRef) <= 105) {
      setCurrent(Tabs.BUNS);
    } else if (calculationDifferences(sausesRef) <= 105) {
      setCurrent(Tabs.SAUCES);
    } else if (calculationDifferences(mainsRef) <= 105) {
      setCurrent(Tabs.MAINS);
    }
  }, [Tabs.BUNS, Tabs.SAUCES, Tabs.MAINS]);

  useEffect(() => {
    tabSwitch();
    return tabSwitch();
  }, [tabSwitch]);

  return (
    <div>
      <div className={styles.burgerIngredientsTabs} ref={tabsRef}>
        <Tab
          value="buns"
          active={current === 'buns'}
          onClick={() => {
            setCurrent(Tabs.BUNS);
            bunsRef.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === 'sauces'}
          onClick={() => {
            setCurrent(Tabs.SAUCES);
            sausesRef.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === 'mains'}
          onClick={() => {
            setCurrent(Tabs.MAINS);
            mainsRef.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.wrap} onScroll={tabSwitch}>
        <p className="text text_type_main-medium" ref={bunsRef}>
          Булки
        </p>
        <IngredientsGroup data={buns} />
        <p className="text text_type_main-medium" ref={sausesRef}>
          Соусы
        </p>
        <IngredientsGroup data={sauses} />
        <p className="text text_type_main-medium" ref={mainsRef}>
          Начинки
        </p>
        <IngredientsGroup data={mains} />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
