import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-auth-details.module.css';

export const NotAuthDetails = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1>Упс похоже вы не авторизированы(</h1>
      <Link to="/login" className={styles.link}>
        Авторизироваться
      </Link>
    </div>
  );
};
