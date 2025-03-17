import { useContext } from 'react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import './Header.css';

function Header({ cityName, handleButtonOpen, handleButtonClose }) {
  const currentDate = new Date().toLocaleString('en-EN', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left-section">
        <h1 className="header__logo">wtwr°</h1>
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
        <li className="header__nav-item header__nav-item_type_name">
          Terrence Tegegne
        </li>
        <li className="header__nav-item header__nav-item_type_avatar">
          <img
            className="header__user-image"
            src="https://i.ibb.co/9HnNNzsk/2e259a8c8558ae5104a4ec0d6ae39021.png"
            alt="user image"
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
