// External
import './ItemCard.css';
import { useContext } from 'react';

// Contexts
import { CurrentCardContext } from '../../../contexts/CurrentCardContext';

function ItemCard({
  id,
  name,
  imageUrl,
  weather,
  likes,
  owner,
  handleCardClick,
}) {
  const { setCurrentCard } = useContext(CurrentCardContext);

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
      <p className="item-card__name">{name}</p>
    </div>
  );
}

export default ItemCard;
