import { useState, useEffect } from 'react';
import databaseApi from '../utils/apis/databaseApi.js';

export function useClothingItems() {
  const [currentClothingItems, setCurrentClothingItems] = useState([]);

  function handleAddItemSubmit(item) {
    return databaseApi
      .createItem({
        name: item.name,
        imageUrl: item.imageUrl,
        weather: item.weather,
      })
      .then((newItem) => {
        setCurrentClothingItems([...currentClothingItems, newItem]);
        return newItem;
      });
  }

  // Calls the items api with the deleteItem function.
  // function takes an item id and returns a promise.
  function handleDeleteItem({ id }) {
    return databaseApi
      .deleteItem({ id })
      .then(() =>
        setCurrentClothingItems(
          currentClothingItems.filter((item) => item._id !== id)
        )
      );
  }

  useEffect(() => {
    databaseApi.getItems().then((arr) => {
      setCurrentClothingItems(arr);
    });
  }, []);

  return {
    currentClothingItems,
    setCurrentClothingItems,
    handleDeleteItem,
    handleAddItemSubmit,
  };
}
