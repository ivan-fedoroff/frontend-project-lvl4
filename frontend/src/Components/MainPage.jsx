import { Navigate } from 'react-router-dom';
import logo from '../images/logo.svg';

const reactFish = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit
        <code>src/App.js</code>
        and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);

const MainPage = () => {
  const item = localStorage.getItem('userId');

  return (
    item ? reactFish() : <Navigate to="/login" />
  );
};

export default MainPage;
