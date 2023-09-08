import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';

// import { useDispatch } from 'react-redux';
import styles from './bun.module.css';
import { IIngredient, useDispatch } from '../../../utils/types';
import { UPDATE_BUN_IN_BURGER_CONSTRUCTOR } from '../../../services/constants/burger-constructor-constants';
import { UPDATE_BUN_COUNT } from '../../../services/constants/burger-ingredients-constants';

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
      payload: {
        itemId: item._id,
      },
      // payload: { ...item },
    });
  };

  const [, dropBuns] = useDrop<IIngredient>({
    accept: 'bun',
    drop(item) {
      onHandleDropBuns(item as IIngredient);
    },
  });

  return (
    <div ref={dropBuns} data-test="constructor-drop-target-bun">
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

export default Bun;
