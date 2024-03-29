import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from './hooks/useAuth';

const Layout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    /* eslint-disable functional/no-expression-statements */
    auth.logOut();
    navigate('/login');
    /* eslint-enable */
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/">Hexlet Chat</Link>
          {auth.loggedIn ? <Button variant="primary" onClick={handleClick}>{t('buttons.logout')}</Button> : null}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
