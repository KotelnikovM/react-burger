import { ChangeEvent, FormEvent, useState } from 'react';

import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { useDispatch } from 'react-redux';
import { passwordForgot } from '../../services/actions/user-actions';

export const ForgotPasswordPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(passwordForgot(email)).then(() => {
      //@ts-ignore

      localStorage.setItem('correctEmail', true);
      navigate('/reset-password');
    });
  };

  return (
    <form className={styles.forgotPassworWindow} onSubmit={handleSubmit}>
      <h2 className="mb-6">Восстановление пароля</h2>
      <EmailInput
        extraClass="mb-6"
        placeholder={'Укажите e-mail'}
        value={email}
        onChange={onChangeEmail}
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
        Восстановить
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
