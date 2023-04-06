import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';

export const ForgotPasswordPage = () => {
  return (
    <section className={styles.forgotPassworWindow}>
      <h2 className="mb-6">Восстановление пароля</h2>
      <EmailInput extraClass="mb-6" placeholder={'Укажите e-mail'} />
      <Link to="/reset-password">
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </Link>
      <p
        className="text text_type_main-default text_color_inactive"
        style={{ marginBottom: '20px' }}
      >
        Воспомнили пароль?&nbsp;{' '}
        <Link className={styles.link} to="/login">
          {' '}
          Войти
        </Link>
      </p>
    </section>
  );
};
