import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { UPDATE_BUN_IN_BURGER_CONSTRUCTOR } from '../../../services/actions/burger-constructor-actions';

const Bun = ({ bun, coordinate }) => {
  const dispatch = useDispatch();

  const onHandleDropBuns = (item) =>
    dispatch({
      type: UPDATE_BUN_IN_BURGER_CONSTRUCTOR,
      isBun: true,
      payload: {
        ...item,
      },
    });

  const [, dropBuns] = useDrop({
    accept: 'bun',
    drop(item) {
      onHandleDropBuns(item);
    },
  });

  return (
    <div ref={dropBuns}>
      {bun ? (
        <ConstructorElement
          type={coordinate}
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun?.image}
        />
      ) : (
        <div
          // ref={dropBuns}
          style={{
            textAlign: 'center',
          }}
          className={`constructor-element ${
            coordinate === 'bottom'
              ? 'constructor-element_pos_bottom'
              : 'constructor-element_pos_top'
          }`}
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
