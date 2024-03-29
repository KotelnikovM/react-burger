import { ChangeEvent, FormEvent, useState } from 'react';
import {
  PasswordInput,
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
// import { useDispatch } from 'react-redux';
import { login } from '../../services/actions/user-actions';
import { useDispatch } from '../../utils/types';

type TForm = {
  email: string;
  password: string;
};

export const LoginPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<TForm>({
    email: '',
    password: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    login({ email: form.email, password: form.password })(dispatch).then(() => {
      navigate('/login');
    });
  };

  return (
    <form className={styles.loginWindow} onSubmit={handleSubmit}>
      <h2 className="mb-6">Вход</h2>

      <EmailInput
        extraClass="mb-6"
        placeholder={'E-mail'}
        value={form.email}
        name="email"
        onChange={onChange}
      />
      <PasswordInput
        extraClass="mb-6"
        placeholder={'Пароль'}
        icon={'ShowIcon'}
        name="password"
        value={form.password}
        onChange={onChange}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Войти
      </Button>
      <p
        className="text text_type_main-default text_color_inactive"
        style={{ marginBottom: '20px' }}
      >
        Вы новый пользователь?&nbsp;{' '}
        <Link className={styles.link} to="/registration">
          {' '}
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive ">
        Забыли пароль?&nbsp;{' '}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </form>
  );
};
