// External
import { useEffect, useState } from 'react';

// Contexts
import { CurrentWeatherDataContext } from './CurrentWeatherDataContext';
import { CurrentTemperatureUnitContext } from './CurrentTemperatureUnitContext';
import { CurrentClothingItemsContext } from './CurrentClothingItemsContext.js';
import { CurrentUserContext } from './CurrentUserContext.js';
import { CurrentCardContext } from './CurrentCardContext.js';

// Apis
import authApi from '../utils/apis/authApi.js';
import { getToken, removeToken, setToken } from '../utils/token.js';

function AppContextProvider({
  children,
  currentWeatherData,
  currentClothingItems,
}) {
  const [currentCard, setCurrentCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: false,
    _id: '',
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
  const fetchAndSetUser = () => {
    return authApi.getUser().then((user) =>
      setCurrentUser({
        isLoggedIn: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      })
    );
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

  // Update User Info
  const updateUserInfo = ({ name, avatar }) => {
    return setCurrentUser({
      ...currentUser,
      name,
      avatar,
    });
  };

  // Log out
  const signOut = () => {
    removeToken();
    setCurrentUser({
      isLoggedIn: false,
      _id: '',
      name: '',
      email: '',
      avatar: '',
    });
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
    if (token) fetchAndSetUser();
  }, []);

  return (
    <CurrentCardContext.Provider value={{ currentCard, setCurrentCard }}>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          signOut,
          updateUserInfo,
          handleSignIn,
          handleSignUp,
        }}
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
    </CurrentCardContext.Provider>
  );
}

export default AppContextProvider;
