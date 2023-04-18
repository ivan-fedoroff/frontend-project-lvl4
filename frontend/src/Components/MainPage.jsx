/* eslint-disable functional/no-expression-statements, functional/no-conditional-statements */

import { Navigate } from 'react-router-dom';
import Chat from './Chat';
import useAuth from './hooks/useAuth';

const MainPage = () => {
  const token = localStorage.getItem('token');
  const auth = useAuth();
  if (token) {
    auth.logIn();
  }

  return (
    token ? <Chat /> : <Navigate to="/login" />
  );
};

export default MainPage;
