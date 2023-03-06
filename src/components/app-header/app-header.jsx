import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.burgerConstructorTab}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={styles.orderFeedTab}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </div>
        <div className={styles.logoTab}>
          <Logo />
        </div>
        <div className={styles.personalAreaTab}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
