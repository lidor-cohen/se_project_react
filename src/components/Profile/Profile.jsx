import './Profile.css';

import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile({ handleCardClick, handleAddCard }) {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection
        handleCardClick={handleCardClick}
        handleAddCard={handleAddCard}
      />
    </div>
  );
}

export default Profile;
