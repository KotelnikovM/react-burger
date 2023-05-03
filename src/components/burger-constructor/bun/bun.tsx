import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { UPDATE_BUN_COUNT } from '../../../services/actions/burger-ingredients-actions';
import styles from './bun.module.css';
import { ingredientPropTypes } from '../../../utils/ingredientPropTypes';
import { IIngredient } from '../../../utils/types';
import { UPDATE_BUN_IN_BURGER_CONSTRUCTOR } from '../../../services/constants/burger-constructor-constants';

type TBunProps = {
  bun: IIngredient | null;
  coordinate: 'top' | 'bottom' | undefined;
  position: string;
};

const Bun = ({ bun, coordinate, position }: TBunProps): JSX.Element => {
  const dispatch = useDispatch();

  const onHandleDropBuns = (item: IIngredient): void => {
    dispatch({
      type: UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
      isBun: true,
      payload: {
        ...item,
      },
    });
    dispatch({
      type: UPDATE_BUN_COUNT,
      payload: { itemId: item._id },
    });
  };

  const [, dropBuns] = useDrop<IIngredient>({
    accept: 'bun',
    drop(item) {
      onHandleDropBuns(item as IIngredient);
    },
  });

  return (
    <div ref={dropBuns}>
      {bun ? (
        <ConstructorElement
          type={coordinate}
          isLocked={true}
          text={`${bun.name} ${position}`}
          price={bun.price}
          thumbnail={bun?.image}
        />
      ) : (
        <div
          style={{
            textAlign: 'center',
          }}
          className={`constructor-element ${
            coordinate === 'bottom'
              ? 'constructor-element_pos_bottom'
              : 'constructor-element_pos_top'
          } ${styles.bun}`}
        >
          <span
            style={{
              transform: 'translateY(50%)',
            }}
            className="constructor-element__text"
          >
            Выбери булку
          </span>
        </div>
      )}
    </div>
  );
};

Bun.propTypes = {
  bun: ingredientPropTypes,
  coordinate: PropTypes.string,
  position: PropTypes.string,
};

export default Bun;
