import styles from './ingredient-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { IIngredient } from '../../../utils/types';

type TIngredientGroupProps = {
  data: IIngredient[];
};

const IngredientsGroup = ({ data }: TIngredientGroupProps): JSX.Element => {
  console.log(data);

  return (
    <div className={styles.box}>
      {data?.map((item: IIngredient) => {
        return <IngredientItem key={item._id} {...item} />;
      })}
    </div>
  );
};

export default IngredientsGroup;
