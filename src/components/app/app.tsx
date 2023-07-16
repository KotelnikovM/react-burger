import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/registration/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/registration/forgot-password';
import { ResetPasswordPage } from '../../pages/registration/reset-password';
import { OnlyAuth, OnlyUnAuth } from '../protected-route';
// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/actions/user-actions';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients-actions';
import Modal from '../modal/modal';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { useDispatch } from '../../utils/types';
import OrderPage from '../../pages/profile/orders/orders';
import { paths } from '../../utils/routes';
import { Feed } from '../../pages/feed/feed';
import { OrderInfo } from '../order/order-info/order-info';
import Orders from '../../pages/profile/orders/orders';
import { Profile } from '../../pages/profile/profile';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const onCloseModal = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getBurgerIngredients());
    checkUserAuth()(dispatch);
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path={paths.homePage} element={<HomePage />} />
        <Route path={paths.ingredientDetails} element={<IngredientDetails />} />
        <Route
          path={paths.login}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={paths.registration}
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path={paths.forgotPassword}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={paths.resetPassword}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path={paths.profile}
          element={<OnlyAuth component={<Profile />} />}
        />
        <Route path={paths.feed} element={<Feed />} />
        <Route
          path={`${paths.feed}${paths.orderDetails}`}
          element={<OrderInfo newPage={false} />}
        />
        <Route
          path={paths.orders}
          element={<OnlyAuth component={<Orders />} />}
        />
        <Route
          path={`${paths.orders}${paths.orderDetails}`}
          element={<OnlyAuth component={<OrderInfo newPage={false} />} />}
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
      {background && (
        <Routes>
          <Route
            path={`${paths.feed}${paths.orderDetails}`}
            element={
              <Modal onCloseModal={onCloseModal}>
                <OrderInfo newPage />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path={`${paths.orders}${paths.orderDetails}`}
            element={
              <OnlyAuth
                component={
                  <Modal onCloseModal={onCloseModal}>
                    <OrderInfo newPage />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
