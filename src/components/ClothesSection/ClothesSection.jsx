import './ClothesSection.css';
import { useContext } from 'react';

import { CurrentWeatherDataContext } from '../../contexts/CurrentWeatherDataContext';

import ItemCard from '../ItemCard/ItemCard';
import { defaultClothingItems } from '../../utils/constants';

function ClothesSection({ handleCardClick }) {
  const { currentWeatherData } = useContext(CurrentWeatherDataContext);
  const filteredClothingItems = defaultClothingItems.filter(
    (item) => item.weather === currentWeatherData.feeling
  );

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
            image={item.link}
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
