import './Profile.css';

import Sidebar from '../Sidebar/Sidebar';
import ClothesSection from '../ClothesSection/ClothesSection';

function Profile() {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection />
    </div>
  );
}

export default Profile;
