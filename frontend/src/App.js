import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Components/NotFound';
import MainPage from './Components/MainPage';
import AuthPage from './Components/AuthPage';
import Layout from './Components/Layout';

const App = () => (
  <BrowserRouter>
    <div className="h-100 bg-light">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Routes>
    </div>

  </BrowserRouter>
);

export default App;
