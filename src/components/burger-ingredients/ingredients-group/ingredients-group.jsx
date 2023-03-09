import PropTypes from 'prop-types';
import styles from './ingredient-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { ingredientPropTypes } from '../../../types/ingredientPropTypes';

const IngredientsGroup = ({ data }) => {
  return (
    <div className={styles.box}>
      {data?.map((item) => {
        return <IngredientItem key={item._id} item={item} />;
      })}
    </div>
  );
};

IngredientsGroup.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default IngredientsGroup;
