/* eslint-disable functional/no-expression-statements, consistent-return */

import './App.css';
import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './Components/AuthContext';
import NotFound from './Components/NotFound';
import MainPage from './Components/MainPage';
import AuthPage from './Components/AuthPage';
import Layout from './Components/Layout';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn])}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
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
  </AuthProvider>
);

export default App;
