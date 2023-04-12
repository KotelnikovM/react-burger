import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  });

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />
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
      </BrowserRouter>
    </div>
  );
};

export default App;
