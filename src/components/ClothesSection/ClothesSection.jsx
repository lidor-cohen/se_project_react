import './ClothesSection.css';
import { useContext, useState, useEffect } from 'react';

import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext';
import { CurrentClothingItemsContext } from '../../contexts/CurrentClothingItemsContext';

import ItemCard from '../ItemCard/ItemCard';

function ClothesSection({ handleCardClick }) {
  const { currentClothingItems } = useContext(CurrentClothingItemsContext);
  const { currentWeatherData } = useContext(CurrentWeatherDataContext);

  const [filteredClothingItems, setFilteredClothingItems] = useState([]);

  useEffect(() => {
    setFilteredClothingItems(
      currentClothingItems.filter(
        (item) => item.weather === currentWeatherData.feeling
      )
    );
  }, []);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <span className="clothes-section__title">Your Items:</span>
        <a className="clothes-section__add-new" href="#">
          + Add New
        </a>
      </div>
      <div className="clothes-section__gallery">
        {filteredClothingItems.map((item) => (
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
