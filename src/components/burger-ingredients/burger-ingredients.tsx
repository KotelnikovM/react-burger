import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IIngredient } from '../../utils/types';

const BurgerIngredients = (): JSX.Element => {
  //@ts-ignore
  const data = useSelector((state) => state.burgerIngredient.ingredients);

  const dispatch = useDispatch();

  const Tabs = {
    BUNS: 'buns',
    SAUCES: 'sauces',
    MAINS: 'mains',
  };

  const [current, setCurrent] = useState(Tabs.BUNS);

  const buns = useMemo(
    () => data.filter((item: IIngredient) => item.type === 'bun'),
    [data]
  );

  const sauses = useMemo(
    () => data.filter((item: IIngredient) => item.type === 'sauce'),
    [data]
  );

  const mains = useMemo(
    () => data.filter((item: IIngredient) => item.type === 'main'),
    [data]
  );

  const tabsRef = useRef<HTMLHeadingElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const sausesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);

  const tabSwitch = useCallback(() => {
    const calculationDifferences = (
      ref: React.RefObject<HTMLHeadElement>
    ): number => {
      if (tabsRef.current && ref.current) {
        Math.abs(
          tabsRef.current.getBoundingClientRect().bottom -
            ref.current.getBoundingClientRect().top
        );
      }
      return 0;
    };

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
  }, [tabSwitch, dispatch]);

  const onClickTab = (
    tabName: string,
    ref: React.RefObject<HTMLHeadingElement>
  ): void => {
    setCurrent(tabName);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.burgerIngredients}>
      <div className={styles.burgerIngredientsTabs} ref={tabsRef}>
        <Tab
          value="buns"
          active={current === 'buns'}
          onClick={() => {
            onClickTab(Tabs.BUNS, bunsRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === 'sauces'}
          onClick={() => {
            onClickTab(Tabs.SAUCES, sausesRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="mains"
          active={current === 'mains'}
          onClick={() => {
            onClickTab(Tabs.MAINS, mainsRef);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.wrap} custom-scroll`} onScroll={tabSwitch}>
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
    </section>
  );
};

export default BurgerIngredients;
