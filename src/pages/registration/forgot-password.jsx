import { useState } from 'react';

import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { useDispatch } from 'react-redux';
import { passwordForgot } from '../../services/actions/user-actions';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordForgot(email)).then(() => {
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
      <Link to="/reset-password">
        <Button
          htmlType="submit"
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
    </form>
  );
};
