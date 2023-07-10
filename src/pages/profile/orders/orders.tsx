import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { v4 as uuid } from 'uuid';
import stylesOrders from './orders.module.css';
import { getUser } from '../../../services/actions/user-actions';
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
} from '../../../services/actions/WS-auth-action';
import { useDispatch, useSelector } from '../../../utils/types';
import { Order } from '../../../components/order/order';
import { ProfileAsideMenu } from '../aside-menu/aside-menu';

const Orders = (): JSX.Element => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch({ type: WS_AUTH_CONNECTION_START });
    return () => {
      dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const { orders } = useSelector((store) => store.wsAuth);

  return (
    <section className={stylesOrders.wrapper}>
      <ProfileAsideMenu />
      {orders && orders.length > 0 ? (
        <ul className={`${stylesOrders.orders} pr-2 custom-scroll`}>
          {orders &&
            orders
              .map((order) => (
                <Order
                  key={uuid()}
                  order={order}
                  ordersPage
                  location={location}
                />
              ))
              .reverse()}
        </ul>
      ) : (
        <div>Вы пока ничего не заказывали</div>
      )}

      {id ? <div>в id что-то лежит</div> : null}
    </section>
  );
};

export default Orders;
