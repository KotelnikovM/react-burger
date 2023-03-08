import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
  image_large,
  setActive,
}) => {
  return (
    <div className={styles.ingredientDetails}>
      <div className={styles.ingredientDetailsHead}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
        <CloseIcon onClick={() => setActive(false)} type="primary" />
      </div>
      <img className="mb-4" src={image_large} alt={name} />
      <p className="mb-8 text text_type_main-medium">{name}</p>
      <div className={styles.ingredientDetailsInfo}>
        <div className="mr-5">
          <p className="text text_type_main-small text_color_inactive">
            Каллории,ккал
          </p>
          <p className="text text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className="mr-5">
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </div>
        <div>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string,
    __v: PropTypes.number,
    _id: PropTypes.string,
  }),
};

export default IngredientDetails;
