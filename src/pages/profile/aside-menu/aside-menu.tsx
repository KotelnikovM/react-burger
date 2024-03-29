import { ReactElement } from 'react';
import { useMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../../../services/actions/user-actions';
import { paths } from '../../../utils/routes';
import { useDispatch } from '../../../utils/types';
import asideMenuStyles from './aside-menu.module.css';

export function ProfileAsideMenu(): ReactElement {
  const dispatch = useDispatch();

  const isProfile = !!useMatch<string, string>(paths.profile);
  const isOrders = !!useMatch<string, string>(paths.orders);

  return (
    <aside className={asideMenuStyles.asideWrapper}>
      <ul className={asideMenuStyles.asideList}>
        <li
          className={`
                        ${asideMenuStyles.asideItem}
                        ${isProfile ? asideMenuStyles.active : ''}`}
        >
          <Link
            className={`${asideMenuStyles.asideItem}
                            ${isProfile ? asideMenuStyles.active : ''}`}
            to={paths.profile}
          >
            Профиль
          </Link>
        </li>
        <li
          className={`${asideMenuStyles.asideItem}
                        ${isOrders ? asideMenuStyles.active : ''}`}
        >
          <Link
            className={`${asideMenuStyles.asideItem}
                            ${isOrders ? asideMenuStyles.active : ''}`}
            to={paths.orders}
          >
            История заказа
          </Link>
        </li>
        <li className={asideMenuStyles.asideItem}>
          <Link
            className={asideMenuStyles.asideItem}
            to={paths.login}
            onClick={() => logout()(dispatch)}
          >
            Выход
          </Link>
        </li>
      </ul>
      <p className={asideMenuStyles.p}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </aside>
  );
}
