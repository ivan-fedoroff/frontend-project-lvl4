import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from './Components/AuthContext';
import NotFound from './Components/NotFound';
import MainPage from './Components/MainPage';
import AuthPage from './Components/AuthPage';
import RegPage from './Components/RegPage';
import Layout from './Components/Layout';

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  const initState = !!token;
  const [loggedIn, setLoggedIn] = useState(initState);

  const logIn = () => setLoggedIn(true);
  /* eslint-disable functional/no-expression-statements */
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  /* eslint-enable */

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => {
  /* eslint-disable functional/no-expression-statements */
  useEffect(() => {
    document.body.classList.add(
      'h-100',
      'bg-light',
    );
    const html = document.querySelector('html');
    html.classList.add('h-100');
    const root = document.getElementById('root');
    root.classList.add('h-100');
  });
  /* eslint-enable */

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<RegPage />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
