import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/registration/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/registration/forgot-password';
import { ResetPasswordPage } from '../../pages/registration/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/actions/user-actions';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients-actions';
import OrderPage from '../../pages/profile/orders/order';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const onCloseModal = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getBurgerIngredients());
    // @ts-ignore
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route
          path="/ingredients/:id"
          // @ts-ignore

          element={<IngredientDetails />}
        />

        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile/orders"
          element={<OnlyUnAuth component={<OrderPage />} />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="/registration"
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onCloseModal={onCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
