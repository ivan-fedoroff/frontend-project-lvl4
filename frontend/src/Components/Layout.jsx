import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      </div>
    </nav>
    <Outlet />
  </div>

);

export default Layout;
