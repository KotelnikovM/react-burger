import styles from './order-details.module.css';
import img from '../../../images/graphics.svg';
import { useSelector } from '../../../utils/types';

const OrderDetails = (): JSX.Element => {
  const { number } = useSelector((state) => state.order);

  return (
    <div className={styles.orderDetailsContainer}>
      <p className="mb-4 text text_type_digits-large">{number}</p>
      <p className="mb-15 text text_type_main-default" data-test="identify">
        идентификатор заказа
      </p>
      <img className="mb-15" src={img} alt="done" />
      <p className="mb-2 text text_type_main-small">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
