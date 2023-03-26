import { Navigate } from 'react-router-dom';
import Chat from './Chat';

const MainPage = () => {
  const item = localStorage.getItem('userId');

  return (
    item ? <Chat /> : <Navigate to="/login" />
  );
};

export default MainPage;
