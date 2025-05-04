// External
import { useEffect, useState } from 'react';

// Contexts
import { CurrentWeatherDataContext } from './CurrentWeatherDataContext';
import { CurrentTemperatureUnitContext } from './CurrentTemperatureUnitContext';
import { CurrentClothingItemsContext } from './CurrentClothingItemsContext.js';
import { CurrentUserContext } from './CurrentUserContext.js';

// Apis
import authApi from '../utils/apis/authApi.js';
import { getToken, setToken } from '../utils/token.js';
import { isImageValid } from '../utils/validation.js';

function AppContextProvider({
  children,
  currentWeatherData,
  currentClothingItems,
}) {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    avatar: '',
  });

  // Login and get Token
  const loginUser = ({ email, password }) => {
    return authApi.login({ email, password }).then((res) => {
      setToken(res.token);
      return res.token;
    });
  };

  // Set User State
  const fetchAndSetUser = (token) => {
    return authApi.getUser({ token }).then((user) => {
      return isImageValid(user.avatar).then((avatarUrl) => {
        setCurrentUser({
          isLoggedIn: true,
          name: user.name,
          email: user.email,
          avatar: avatarUrl,
        });
      });
    });
  };

  // Combined functionality
  const handleSignIn = ({ email, password }) => {
    return loginUser({ email, password }).then((token) => {
      return fetchAndSetUser(token);
    });
  };

  // Sign Up User
  const handleSignUp = ({ email, name, avatar, password }) => {
    return authApi
      .signup({ email, password, name, avatar })
      .then(() => handleSignIn({ email, password }));
  };

  // Toggle switch global context
  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((prev) =>
      prev === 'F' ? (prev = 'C') : (prev = 'F')
    );
  }

  // Check for jwt
  useEffect(() => {
    const token = getToken();
    if (token) fetchAndSetUser(token);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleSignIn, handleSignUp }}
    >
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
