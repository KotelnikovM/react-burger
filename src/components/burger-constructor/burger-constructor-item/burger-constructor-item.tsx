import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from 'react-redux';
import styles from './burger-constructor-item.module.css';
import { useDrop, useDrag } from 'react-dnd';
import { useRef } from 'react';
import { DECREMENT_BURGER_INGREDIENT_COUNT } from '../../../services/actions/burger-ingredients-actions';
import { DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR } from '../../../services/constants/burger-constructor-constants';

type BurgerConstructorItemProps = {
  itemId: string;
  image: string;
  price: number;
  name: string;
  ID: string;
  index: number;
  moveIngredients: (dragIndex: number, hoverIndex: number) => void;
};

type TIngredientDragType = {
  ID: string;
  index: number;
};

type TDragCollectedProps = {
  isDragging: boolean;
};

export const BurgerConstructorItem = ({
  itemId,
  image,
  price,
  name,
  ID,
  index,
  moveIngredients,
}: BurgerConstructorItemProps): JSX.Element => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<TIngredientDragType>({
    accept: 'ingredient',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) return;

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

  const [{ isDragging }, drag] = useDrag<
    TIngredientDragType,
    unknown,
    TDragCollectedProps
  >({
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
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => {
          dispatch({
            type: DELETE_INGREDIENT_FROM_BURGER_CONSTRUCTOR,
            payload: ID,
          });
          dispatch({
            type: DECREMENT_BURGER_INGREDIENT_COUNT,
            payload: { itemId },
          });
        }}
      />
    </div>
  );
};
