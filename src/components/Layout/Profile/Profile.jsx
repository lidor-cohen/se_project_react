import './Profile.css';

import Sidebar from './Sidebar/Sidebar';
import ClothesSection from './ClothesSection/ClothesSection';

function Profile({ handleCardClick, openModal }) {
  return (
    <div className="profile">
      <Sidebar openModal={openModal} />
      <ClothesSection handleCardClick={handleCardClick} openModal={openModal} />
    </div>
  );
}

export default Profile;
