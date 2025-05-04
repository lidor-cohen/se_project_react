import { useContext } from 'react';
import './Sidebar.css';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function Sidebar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img
          className="sidebar__profile-image"
          src={currentUser.avatar}
          alt="profile-image"
        />
        <p className="sidebar__profile-name">{currentUser.name}</p>
      </div>
    </div>
  );
}

export default Sidebar;
