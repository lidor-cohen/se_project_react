import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img
          className="sidebar__profile-image"
          src="https://i.ibb.co/9HnNNzsk/2e259a8c8558ae5104a4ec0d6ae39021.png"
          alt="profile-image"
        />
        <p className="sidebar__profile-name">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default Sidebar;
