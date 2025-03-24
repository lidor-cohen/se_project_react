// External
import './ItemCard.css';

function ItemCard({ id, name, imageUrl, weather, handleCardClick }) {
  return (
    <div
      className="item-card"
      style={{
        backgroundImage: `url(${new URL(imageUrl, import.meta.url).href})`,
      }}
      onClick={() => {
        handleCardClick({ id, name, imageUrl, weather });
      }}
    >
      <p className="item-card__name">{name}</p>
    </div>
  );
}

export default ItemCard;
