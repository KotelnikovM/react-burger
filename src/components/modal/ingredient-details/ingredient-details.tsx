import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {} from '../../../services/actions/burger-constructor-actions';
import { IIngredient } from '../../../utils/types';

type TIngredientDetails = Pick<
  IIngredient,
  'image_large' | 'name' | 'calories' | 'proteins' | 'fat' | 'carbohydrates'
>;

const IngredientDetails = (): JSX.Element => {
  const { id } = useParams();

  const ingredients = useSelector(
    //@ts-ignore

    (state) => state.burgerIngredient.ingredients
  );

  const ingredient: IIngredient | undefined = ingredients.find(
    (it: IIngredient) => it._id === id
  );

  const {
    image_large,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  }: TIngredientDetails = ingredient || {
    image_large: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
  };

  return (
    <div className={styles.ingredientDetails}>
      <div className={styles.ingredientDetailsHead}>
        <h2 className="text text_type_main-large">Детали ингредиента</h2>
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

export default IngredientDetails;
