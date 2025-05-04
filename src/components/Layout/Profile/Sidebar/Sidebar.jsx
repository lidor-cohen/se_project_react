// External
import './Sidebar.css';
import { useContext } from 'react';

// Components
import AvatarImage from '../../../UI/AvatarImage/AvatarImage';

// Contexts
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function Sidebar({ openModal }) {
  const { currentUser, signOut } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <AvatarImage size={56} />
        <p className="sidebar__profile-name">{currentUser.name}</p>
      </div>

      <div className="sidebar__profile-actions">
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            openModal('change-profile-info');
          }}
        >
          Change profile info
        </a>
        <a
          href=""
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
