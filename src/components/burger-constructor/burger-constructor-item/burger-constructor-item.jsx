import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR } from '../../../services/actions/burger-constructor-actions';
import styles from './burger-constructor-item.module.css';
import { useDrop, useDrag } from 'react-dnd';
import { useRef } from 'react';

export const BurgerConstructorItem = ({
  image,
  price,
  name,
  ID,
  index,
  moveIngredients,
}) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'ingredient',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredients(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { ID, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={styles.iconAndConstructorElement}
      ref={ref}
      style={{ opacity: opacity }}
    >
      <DragIcon className="dragIcon" type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch({
            type: DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
            ID,
          });
        }}
      />
    </div>
  );
};