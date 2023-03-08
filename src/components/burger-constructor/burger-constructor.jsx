import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import '../../index.css';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details/order-details';

const BurgerConstructor = ({ data }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.burgerConstructor}>
      <div className={styles.burgerConstructorItems}>
        <ConstructorElement
          className="ml-5"
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0]?.image}
        />
        <div className={styles.fillings}>
          {data
            .filter((item) => item.type !== 'bun')
            .map(({ _id, name, price, image }) => {
              return (
                <div className={styles.iconAndConstructorElement} key={_id}>
                  <DragIcon className="dragIcon" type="primary" />
                  <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                  />
                </div>
              );
            })}
        </div>
        <ConstructorElement
          className={styles.bla}
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0]?.image}
        />
      </div>
      <div className={styles.allPriceAndButton}>
        <div className={styles.allPrice}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => setActive(true)}
          >
            Оформить заказ
          </Button>
          <Modal active={active} setActive={setActive}>
            <OrderDetails setActive={setActive} />
          </Modal>
        </>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

export default BurgerConstructor;
