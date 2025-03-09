import './ItemCard.css';

function ItemCard(props) {
  return (
    <div
      className="item-card"
      style={{
        backgroundImage: `url(${new URL(props.image, import.meta.url).href})`,
      }}
      onClick={() => props.handleCardClick()}
    >
      <p className="item-card__title">{props.title}</p>
    </div>
  );
}

export default ItemCard;
