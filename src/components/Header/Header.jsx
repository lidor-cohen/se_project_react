import './Header.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ cityName, handleButtonOpen, handleButtonClose }) {
  const currentDate = new Date().toLocaleString('en-EN', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left-section">
        <h1 className="header__logo">
          <Link to="/">wtwr°</Link>
        </h1>
        <h2 className="header__date">
          {currentDate}, {cityName}
        </h2>
      </div>

      <ul className="header__right-section">
        <ToggleSwitch value={false} onChange={() => {}} />
        <li
          className="header__nav-item header__nav-item_type_add-clothes"
          onClick={handleButtonOpen}
        >
          + Add Clothes
        </li>
        <Link to="/profile">
          <li className="header__nav-item header__nav-item_type_account">
            Terrence Tegegne
            <img
              className="header__user-image"
              src="https://i.ibb.co/9HnNNzsk/2e259a8c8558ae5104a4ec0d6ae39021.png"
              alt="user image"
            />
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
