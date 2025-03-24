import './ItemCard.css';

function ItemCard({ image, title, handleCardClick, id, weather }) {
  return (
    <div
      className="item-card"
      style={{
        backgroundImage: `url(${new URL(image, import.meta.url).href})`,
      }}
      onClick={() => {
        handleCardClick({ _id: id, name: title, imageUrl: image, weather });
      }}
    >
      <p className="item-card__title">{title}</p>
    </div>
  );
}

export default ItemCard;
