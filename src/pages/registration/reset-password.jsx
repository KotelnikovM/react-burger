import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';

export const ResetPasswordPage = () => {
  return (
    <section className={styles.resetPassworWindow}>
      <h2 className="mb-6">Восстановление пароля</h2>
      <PasswordInput
        extraClass="mb-6"
        placeholder={'Введите новый пароль'}
        icon={'ShowIcon'}
      />
      <Input extraClass="mb-6" placeholder={'Введите код из письма'} />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Сохранить
      </Button>
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
