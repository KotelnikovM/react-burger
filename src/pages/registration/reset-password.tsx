import { ChangeEvent, FormEvent, useState } from 'react';

import {
  PasswordInput,
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './reset-password.module.css';
import { passwordReset } from '../../services/actions/user-actions';

export const ResetPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    token: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //@ts-ignore

    dispatch(passwordReset(form.password, form.token)).then(() => {
      localStorage.removeItem('correctEmail');
      navigate('/login');
    });
  };

  if (!localStorage.getItem('correctEmail')) {
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.resetPassworWindow} onSubmit={handleSubmit}>
      <h2 className="mb-6">Восстановление пароля</h2>
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name="password"
        extraClass="mb-6"
        placeholder={'Введите новый пароль'}
        icon={'ShowIcon'}
      />
      <Input
        onChange={onChange}
        extraClass="mb-6"
        placeholder={'Введите код из письма'}
        type="text"
        name="token"
        value={form.token}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
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
    </form>
  );
};
