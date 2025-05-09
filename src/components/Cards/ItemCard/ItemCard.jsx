// External
import './ItemCard.css';
import { useContext, useEffect, useState } from 'react';
import HeartHollow from '../../../assets/icons/heart-hollow.svg';
import HeartFilled from '../../../assets/icons/heart-filled.svg';

// Contexts
import { CurrentCardContext } from '../../../contexts/CurrentCardContext';
import { CurrentClothingItemsContext } from '../../../contexts/CurrentClothingItemsContext';

// Apis
import databaseApi from '../../../utils/apis/databaseApi';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

function ItemCard({
  id,
  name,
  imageUrl,
  weather,
  likes,
  owner,
  handleCardClick,
}) {
  const { handleCardLike } = useContext(CurrentClothingItemsContext);
  const { setCurrentCard } = useContext(CurrentCardContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes.some((id) => id === currentUser._id));
  }, [likes, currentUser._id]);

  return (
    <div
      className="item-card"
      style={{
        backgroundImage: `url(${new URL(imageUrl, import.meta.url).href})`,
      }}
      onClick={() => {
        setCurrentCard({ id, name, imageUrl, weather, likes, owner });
        handleCardClick();
      }}
    >
      <div className="item-card__actions">
        <p className="item-card__action item-card__name">{name}</p>
        {currentUser.isLoggedIn && (
          <img
            src={!isLiked ? HeartHollow : HeartFilled}
            className="item-card__action item-card__like"
            onClick={(e) => {
              e.stopPropagation();
              handleCardLike({ id, isLiked });
              setIsLiked(!isLiked);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ItemCard;
