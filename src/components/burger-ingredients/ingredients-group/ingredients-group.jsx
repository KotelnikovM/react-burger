import PropTypes from 'prop-types';
import styles from './ingredient-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

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

export default IngredientsGroup;
