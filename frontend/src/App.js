import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Components/NotFound';
import MainPage from './Components/MainPage';
import AuthPage from './Components/AuthPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      {}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
