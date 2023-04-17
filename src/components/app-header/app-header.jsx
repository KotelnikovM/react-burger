import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useMatch } from 'react-router-dom';
import styles from './app-header.module.css';

const AppHeader = () => {
  const activeStyle = 'text text_type_main-default';
  const inactiveStyle = 'text text_type_main-default text_color_inactive';

  const isProfile = !!useMatch('/profile');
  const isHome = !!useMatch('/');
  const isOrders = !!useMatch('/profile/orders');

  return (
    <header className={styles.appHeader}>
      <ul className={styles.container}>
        <li className={styles.burgerConstructorTab}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <BurgerIcon type={isHome ? 'primary' : 'secondary'} />
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-default'
                : 'text text_type_main-default text_color_inactive'
            }
          >
            <p>Конструктор</p>
          </NavLink>
        </li>
        <li className={styles.orderFeedTab}>
          <NavLink to="/profile/orders">
            <ListIcon type={isOrders ? 'primary' : 'secondary'} />
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-default'
                : 'text text_type_main-default text_color_inactive'
            }
          >
            <p>Лента заказов</p>
          </NavLink>
        </li>
        <li className={styles.logoTab}>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className={styles.personalAreaTab}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
          >
            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? 'text text_type_main-default'
                : 'text text_type_main-default text_color_inactive'
            }
          >
            <p>Личный кабинет</p>
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
