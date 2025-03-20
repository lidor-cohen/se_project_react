import './Profile.css';

import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ handleCardClick }) {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection handleCardClick={handleCardClick} />
    </div>
  );
}

export default Profile;
