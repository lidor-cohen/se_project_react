import './ItemCard.css';

function ItemCard({ image, title }) {
  return (
    <div
      className="item-card"
      style={{
        backgroundImage: `url(${new URL(image, import.meta.url).href})`,
      }}
      onClick={() => props.handleCardClick()}
    >
      <p className="item-card__title">{title}</p>
    </div>
  );
}

export default ItemCard;
