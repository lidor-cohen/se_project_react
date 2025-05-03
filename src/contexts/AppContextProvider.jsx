// External
import { useState } from 'react';

// Contexts
import { CurrentWeatherDataContext } from './CurrentWeatherDataContext';
import { CurrentTemperatureUnitContext } from './CurrentTemperatureUnitContext';
import { CurrentClothingItemsContext } from './CurrentClothingItemsContext.js';
import { CurrentUserContext } from './CurrentUserContext.js';

function AppContextProvider({
  children,
  currentWeatherData,
  currentClothingItems,
}) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState(false);

  // Toggle switch global context
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) =>
      prev === 'F' ? (prev = 'C') : (prev = 'F')
    );
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <CurrentClothingItemsContext.Provider value={{ currentClothingItems }}>
        <CurrentWeatherDataContext.Provider value={{ currentWeatherData }}>
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            {children}
          </CurrentTemperatureUnitContext.Provider>
        </CurrentWeatherDataContext.Provider>
      </CurrentClothingItemsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default AppContextProvider;
