import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-auth-details.module.css';

export const NotAuthDetails = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Упс, похоже вы не зарегистрированы(</h1>
      <Link to="/login" className={styles.link}>
        Зарегистрироваться
      </Link>
    </div>
  );
};
