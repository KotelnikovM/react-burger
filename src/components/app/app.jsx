import AppHeader from '../app-header/app-header';
import styles from './app.module.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/registration/login';
import { RegistrationPage } from '../../pages/registration/registration';
import { ForgotPasswordPage } from '../../pages/registration/forgot-password';
import { ResetPasswordPage } from '../../pages/registration/reset-password';
import { ProfilePage } from '../../pages/profile/profile';

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
