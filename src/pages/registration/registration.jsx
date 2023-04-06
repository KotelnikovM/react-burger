import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';

export const RegistrationPage = () => {
  return (
    <section className={styles.registerWindow}>
      <h2 className="mb-6">Регистрация</h2>
      <Input extraClass="mb-6" placeholder={'Имя'} />
      <EmailInput extraClass="mb-6" placeholder={'E-mail'} />
      <PasswordInput
        extraClass="mb-6"
        placeholder={'Пароль'}
        icon={'ShowIcon'}
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
        Зарегистрироваться
      </Button>
      <p
        className="text text_type_main-default text_color_inactive"
        style={{ marginBottom: '20px' }}
      >
        Уже зарегистрированы?&nbsp;{' '}
        <Link className={styles.link} to="/login">
          {' '}
          Войти
        </Link>
      </p>
    </section>
  );
};
