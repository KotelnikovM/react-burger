import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../../images/graphics.svg';

const OrderDetails = ({ setActive }) => {
  return (
    <div className={styles.orderDetailsContainer}>
      <div className={styles.closeIcon}>
        <CloseIcon onClick={() => setActive(false)} />
      </div>
      <p className="mb-4 text text_type_digits-large">034535</p>
      <p className="mb-15 text text_type_main-default">идентификатор заказа</p>
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

OrderDetails.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default OrderDetails;
