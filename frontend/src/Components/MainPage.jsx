import { Navigate } from 'react-router-dom';
import Chat from './Chat';

const MainPage = () => {
  const token = localStorage.getItem('token');

  return (
    token ? <Chat /> : <Navigate to="/login" />
  );
};

export default MainPage;
