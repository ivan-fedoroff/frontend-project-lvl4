import { Link, Outlet } from 'react-router-dom';
import AuthForm from './AuthForm';
import enterLogo from '../images/authPageLogo.jpeg';

const AuthPage = () => (
  <>
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" src={enterLogo} alt="Войти" />
              </div>
              <AuthForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/sighup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Outlet />
  </>

);

export default AuthPage;
