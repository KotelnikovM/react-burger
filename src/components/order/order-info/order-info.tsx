import { ReactElement, useMemo, useEffect } from 'react';
import { useMatch, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetailsStyles from './order-info.module.css';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../../services/actions/WS-action';
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
} from '../../../services/actions/WS-auth-action';
import { IIngredient, useDispatch, useSelector } from '../../../utils/types';
import { paths } from '../../../utils/routes';
import { Ingredient } from '../ingredient/ingredient';
import {
  getBurgerIngredient,
  getWsAuthOrders,
  getWsOrders,
} from '../../../utils/selector-functions';

type TOrderInfo = {
  newPage: boolean;
};

export function OrderInfo({ newPage }: TOrderInfo): ReactElement {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector(getBurgerIngredient);
  const ingredientsCopy: Array<IIngredient> = structuredClone(ingredients);

  const isOrders = !!useMatch<string, string>(
    `${paths.orders}${paths.orderDetails}`
  );

  const feedOrders = useSelector(getWsOrders);
  const profileOrders = useSelector(getWsAuthOrders);

  const orders = isOrders ? profileOrders : feedOrders;

  useEffect(() => {
    if (isOrders) {
      dispatch({ type: WS_AUTH_CONNECTION_START });
    } else {
      dispatch({ type: WS_CONNECTION_START });
    }

    return () => {
      if (isOrders) {
        dispatch({ type: WS_AUTH_CONNECTION_CLOSED });
      } else {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }
    };
  }, [dispatch, isOrders]);

  const order = orders.find((item) => item._id === id);

  let status: string = '';
  let stylesStatus: string = orderDetailsStyles.statusDone;

  if (order?.status === 'done') {
    status = 'Выполнен';
    stylesStatus = orderDetailsStyles.statusDone;
  } else if (order?.status === 'pending') {
    status = 'Готовится';
    stylesStatus = orderDetailsStyles.statusPending;
  } else if (order?.status === 'created') {
    status = 'Создан';
    stylesStatus = orderDetailsStyles.statusCreated;
  } else {
    status = 'Отменен';
    stylesStatus = orderDetailsStyles.statusError;
  }

  let stylesNumber = orderDetailsStyles.number;
  if (!newPage) {
    stylesNumber = orderDetailsStyles.numberNewPage;
  } else {
    stylesNumber = orderDetailsStyles.number;
  }

  const getDate = () => {
    const date: string | undefined = order?.createdAt;
    return <FormattedDate key={uuid()} date={new Date(date as string)} />;
  };

  const ordersOfIngredients = useMemo(
    () =>
      order?.ingredients
        .map((el) =>
          ingredientsCopy.find((item: IIngredient) => item._id === el)
        )
        .filter((ingredient) => ingredient),
    [order, ingredientsCopy]
  );

  const uniqueIngredients = useMemo(
    () =>
      Array.from(new Set<IIngredient>(ordersOfIngredients as IIngredient[])),
    [ordersOfIngredients]
  );

  uniqueIngredients.map((item) => {
    const count = ordersOfIngredients?.filter(
      (ingredient) => ingredient?._id === item._id
    ).length;
    item.count = count;
    return item;
  });

  const totalPrice = useMemo(
    () =>
      ordersOfIngredients?.reduce(
        (acc, ingredient) => acc + Number(ingredient?.price),
        0
      ),
    [ordersOfIngredients]
  );

  return (
    <div className={orderDetailsStyles.wrapper}>
      <h2 className={stylesNumber}>#{order?.number}</h2>
      <h1 className={orderDetailsStyles.name}>{order?.name}</h1>
      <h3 className={`${stylesStatus} ${orderDetailsStyles.status}`}>
        {status}
      </h3>
      <p className={orderDetailsStyles.constituent}>Состав:</p>
      <ul className={`${orderDetailsStyles.listOfOrders} pl-2 custom-scroll`}>
        {uniqueIngredients.map((item) => (
          <Ingredient
            key={uuid()}
            image={item.image}
            price={item.price}
            name={item.name}
            count={item.count}
          />
        ))}
      </ul>
      <div className={orderDetailsStyles.timeAndTotal}>
        <div className={orderDetailsStyles.createdAt}>{getDate()}</div>
        <div className={orderDetailsStyles.totalPrice}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
