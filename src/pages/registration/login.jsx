import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export const LoginPage = () => {
  return (
    <section className={styles.registerWindow}>
      <h2 className="mb-6">Вход</h2>
      <EmailInput extraClass="mb-6" placeholder={'E-mail'} />
      <PasswordInput
        extraClass="mb-6"
        placeholder={'Пароль'}
        icon={'ShowIcon'}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Войти
      </Button>
      <p
        className="text text_type_main-default text_color_inactive"
        style={{ marginBottom: '20px' }}
      >
        Вы новый пользователь?&nbsp;{' '}
        <Link className={styles.link} to="/">
          {' '}
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive ">
        Забыли пароль?&nbsp;{' '}
        <Link className={styles.link} to="/">
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};
