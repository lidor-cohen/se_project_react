import { useContext } from 'react';
import './Sidebar.css';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import AvatarImage from '../../../UI/AvatarImage/AvatarImage';

function Sidebar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <AvatarImage size={56} />
        <p className="sidebar__profile-name">{currentUser.name}</p>
      </div>
    </div>
  );
}

export default Sidebar;
