// External
import './Header.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';

// Contexts
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import AvatarImage from '../../UI/AvatarImage/AvatarImage';

function Header({ cityName, openModal }) {
  const { currentUser } = useContext(CurrentUserContext);

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

      {currentUser.isLoggedIn ? (
        <ul className="header__right-section">
          <ToggleSwitch />
          <li
            className="header__nav-item header__nav-item_type_add-clothes"
            onClick={() => openModal('add-garment')}
          >
            + Add Clothes
          </li>
          <Link to="/profile">
            <li className="header__nav-item header__nav-item_type_account">
              {currentUser.name}
              <AvatarImage size={40} />
            </li>
          </Link>
        </ul>
      ) : (
        <ul className="header__right-section">
          <ToggleSwitch value={false} onChange={() => {}} />
          <li
            className="header__nav-item header__nav-item_type_add-clothes"
            onClick={() => openModal('signup-modal')}
          >
            Sign Up
          </li>
          <li
            className="header__nav-item header__nav-item_type_add-clothes"
            onClick={() => openModal('signin-modal')}
          >
            Sign In
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
