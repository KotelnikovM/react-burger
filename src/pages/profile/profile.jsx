import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile.module.css';

export const ProfilePage = () => {
  const [name, setName] = useState('');
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState('');
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    setPassword(e.target.value);
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
              <Link className={styles.link} to={'/login'}>
                Выход
              </Link>
            </li>
          </ul>
          <p className={styles.p}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </aside>
        <Input
          onChange={onChangeName}
          placeholder="Имя"
          name="name"
          type="text"
          value={name}
          icon="EditIcon"
          extraClass={`mb-6 ${styles.input}`}
          color="#8585ad"
        />
        <Input
          onChange={onChangeEmail}
          placeholder="Логин"
          name="login"
          type="email"
          value={email}
          icon="EditIcon"
          extraClass="mb-6"
        />
        <Input
          onChange={onChangePassword}
          value={password}
          icon="EditIcon"
          type="password"
          name="password"
          placeholder="Пароль"
          extraClass="mb-6"
        />
      </div>
    </section>
  );
};
