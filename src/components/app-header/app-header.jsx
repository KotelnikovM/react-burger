import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <ul className={styles.container}>
        <li className={styles.burgerConstructorTab}>
          <a href="#">
            <BurgerIcon type="primary" />
          </a>
          <a href="#">
            <p className="text text_type_main-default">Конструктор</p>
          </a>
        </li>
        <li className={styles.orderFeedTab}>
          <a href="#">
            <ListIcon type="secondary" />
          </a>
          <a href="#">
            <p className="text text_type_main-default text_color_inactive">
              Лента заказов
            </p>
          </a>
        </li>
        <li className={styles.logoTab}>
          <a href="#">
            <Logo />
          </a>
        </li>
        <li className={styles.personalAreaTab}>
          <a href="#">
            <ProfileIcon type="secondary" />
          </a>
          <a href="#">
            <p className="text text_type_main-default text_color_inactive">
              Личный кабинет
            </p>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
