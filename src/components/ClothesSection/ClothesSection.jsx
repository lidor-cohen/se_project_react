import './ClothesSection.css';
import { useContext } from 'react';

import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext';

import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({ handleCardClick, handleAddCard }) {
  const { currentClothingItems } = useContext(CurrentClothingItemsContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <span className="clothes-section__title">Your Items:</span>
        <a
          onClick={handleAddCard}
          className="clothes-section__add-new"
          href="#"
        >
          + Add New
        </a>
      </div>
      <div className="clothes-section__gallery">
        {currentClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            image={item.imageUrl}
            title={item.name}
            handleCardClick={() => {
              handleCardClick(item);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;
