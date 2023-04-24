import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
  //@ts-ignore
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);
  //@ts-ignore

  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: {
  component: ReactElement;
}): ReactElement => <Protected onlyUnAuth={true} component={component} />;
