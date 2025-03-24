import './ClothesSection.css';
import { useContext, useEffect } from 'react';

import { CurrentClothingItemsContext } from '../../../../contexts/CurrentClothingItemsContext';
import ItemCard from '../../../ItemCard/ItemCard';

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
        {currentClothingItems
          .map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              name={item.name}
              imageUrl={item.imageUrl}
              weather={item.weather}
              handleCardClick={() => handleCardClick(item)}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default ClothesSection;
