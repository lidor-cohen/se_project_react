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
        setCurrentClothingItems([...currentClothingItems, item]);
        return newItem;
      })
      .catch(console.error);
  }

  // Calls the items api with the deleteItem function.
  // function takes an item id and returns a promise.
  function handleDeleteItem(selectedItemId) {
    databaseApi.deleteItem({ id: selectedItemId }).then(() => {
      setCurrentClothingItems(
        currentClothingItems.filter((item) => item._id !== selectedItemId)
      );
    });
  }

  useEffect(() => {
    databaseApi.getItems().then((arr) => {
      setCurrentClothingItems(arr);
    });
  }, []);

  return { currentClothingItems, handleDeleteItem, handleAddItemSubmit };
}
