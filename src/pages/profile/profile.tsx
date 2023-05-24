import { ChangeEvent, useState } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile.module.css';
// import { useDispatch, useSelector } from 'react-redux';
import { logout, patchUser } from '../../services/actions/user-actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/types';

export const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setForm({
      email: user?.email || '',
      name: user?.name || '',
      password: '',
    });
  }, [user]);

  const resetForms = () => {
    setForm({
      email: user?.email || '',
      name: user?.name || '',
      password: '',
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <aside className={styles.asideWrapper}>
          <ul className={`${styles.asideList} mb-20`}>
            <li className={`${styles.asideItem} ${styles.active}`}>
              <Link
                className={`${styles.asideItem} ${styles.active}`}
                to="/info/profile"
              >
                Профиль
              </Link>
            </li>
            <li className={styles.asideItem}>
              <Link className={styles.link} to="/info/orders">
                История заказа
              </Link>
            </li>
            <li className={styles.asideItem}>
              <Link
                className={styles.link}
                to={'/login'}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Выход
              </Link>
            </li>
          </ul>
          <p className={styles.p}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </aside>
        <Input
          onChange={onChange}
          placeholder="Имя"
          name="name"
          type="text"
          value={form.name}
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
          // color="#8585ad"
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name="email"
          placeholder="email"
          isIcon
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name="password"
          placeholder="password"
          icon="EditIcon"
          extraClass="mb-6"
        />

        {(form.name === user?.name &&
          form.email === user?.email &&
          form.password?.length === 0) || (
          <div>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={resetForms}
            >
              Отмена
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() =>
                //@ts-ignore

                patchUser({
                  email: form.email,
                  password: form.password,
                  name: form.name,
                })(dispatch)
              }
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
