import React from 'react';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

const App = () => {
  return (
    <>
      <AppHeader className={styles.App} />
      <main className={styles.App}></main>
    </>
  );
};

export default App;
