import { Link } from 'react-router-dom';
import logo from '../images/5203299.jpg';

const NotFound = () => (
  <div className="text-center">
    <img className="img-fluid h-25" alt="404" src={logo} />
    <h1 className="h4 text-warning">Страница не найдена</h1>
    <p className="text-warning">
      Но вы можете перейти на&nbsp;
      <Link to="/">главную страницу</Link>
    </p>
  </div>
);

export default NotFound;
