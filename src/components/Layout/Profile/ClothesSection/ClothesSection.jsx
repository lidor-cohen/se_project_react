import './ClothesSection.css';
import { useContext, useEffect } from 'react';

import ItemCard from '../../../Cards/ItemCard/ItemCard';

import { CurrentClothingItemsContext } from '../../../../contexts/CurrentClothingItemsContext';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

function ClothesSection({ handleCardClick, openModal }) {
  const { currentClothingItems } = useContext(CurrentClothingItemsContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <span className="clothes-section__title">Your Items:</span>
        <a
          onClick={(e) => {
            e.preventDefault();
            openModal('add-garment');
          }}
          className="clothes-section__add-new"
          href=""
        >
          + Add New
        </a>
      </div>
      <div className="clothes-section__gallery">
        {currentClothingItems
          .filter((item) => item.owner === currentUser._id)
          .map((item) => (
            <ItemCard
              key={item._id}
              id={item._id}
              name={item.name}
              imageUrl={item.imageUrl}
              weather={item.weather}
              handleCardClick={handleCardClick}
              likes={item.likes}
              owner={item.owner}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default ClothesSection;
