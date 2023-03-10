import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(INGREDIENTS_URL);
      if (response.ok) {
        let ingredients = await response.json();
        setData(ingredients.data);
      } else {
        throw new Error('Ошибка со стороны сервера');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //Уважаемый Михаил! Я исправил все, на что вы указывали, но если вдруг моя работа не пройдет эту проверку, не могли бы Вы указать, какие замечания с прошлых код-ревью я упустил? Хорошего вам дня!

  return (
    <>
      <AppHeader className={styles.App} />
      {data.length ? (
        <main className={styles.App}>
          <h1 className="mt-10 mb-5 text text_type_main-large">
            Соберите бургер
          </h1>
          <div className={styles.ingredientsAndConstructor}>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </div>
        </main>
      ) : (
        <p className={`text text_type_main-large ${styles.mainP}`}>
          Упс... что-то пошло не так. Космолет с космобургерами не долетел ;(
        </p>
      )}
    </>
  );
};

export default App;
