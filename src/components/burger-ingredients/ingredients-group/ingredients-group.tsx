import styles from './ingredient-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { IIngredient } from '../../../utils/types';

type TIngredientGroupProps = {
  data: IIngredient[];
  type: string;
};

const IngredientsGroup = ({
  data,
  type,
}: TIngredientGroupProps): JSX.Element => {
  return (
    <div className={styles.box} data-test={`ingredient-group-${type}`}>
      {data?.map((item: IIngredient) => {
        return <IngredientItem key={item._id} {...item} />;
      })}
    </div>
  );
};

export default IngredientsGroup;
