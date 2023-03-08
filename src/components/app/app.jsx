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
      let ingredients = await response.json();
      setData([...ingredients.data]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AppHeader className={styles.App} />
      {data.length ? (
        <main className={styles.App}>
          <h1
            style={{ width: '100%', margin: '40px, 0, 20px' }}
            className="mt-10 mb-5 text text_type_main-large"
          >
            Соберите бургер
          </h1>
          <div style={{ display: 'flex' }}>
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
