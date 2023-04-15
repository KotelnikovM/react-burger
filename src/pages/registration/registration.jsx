import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerAction } from '../../services/actions/register-actions';
import styles from './registration.module.css';

export const RegistrationPage = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(form.email, form.password, form.name));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerWindow}>
      <h2 className="mb-6">Регистрация</h2>
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        type="text"
        value={form.name}
        onChange={onChange}
      />
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
        value={form.password}
        onChange={onChange}
        name="password"
      />
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        extraClass="mb-20"
        onClick={() => {
          dispatch(registerAction(form.email, form.password, form.name));
        }}
      >
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
    </form>
  );
};
