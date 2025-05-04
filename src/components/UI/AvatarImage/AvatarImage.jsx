import './AvatarImage.css';

// External
import { useContext, useEffect, useState } from 'react';

// Contexts
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

// Utils
import { isImageValid } from '../../../utils/validation';

function AvatarImage({ size }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isValidAvatar, setIsValidAvatar] = useState(false);

  useEffect(() => {
    if (currentUser.avatar) {
      isImageValid(currentUser.avatar).then(setIsValidAvatar);
    }
  }, [currentUser.avatar]);

  const styles = {
    width: size,
    height: size,
    fontSize: size * 0.4,
  };

  if (isValidAvatar)
    return (
      <img
        className="avatar avatar_type_normal"
        src={currentUser.avatar}
        alt="user image"
        style={styles}
      />
    );

  return (
    <div className="avatar avatar_type_fallback" style={styles}>
      {currentUser.name[0].toUpperCase() || '?'}
    </div>
  );
}

export default AvatarImage;
