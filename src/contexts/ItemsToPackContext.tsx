import React, { useState, createContext } from "react";

// Context to help manage Items to Pack state
export const ItemsToPackContext = createContext<any>(null);

export const ItemsToPackProvider: React.FC = ({ children }) => {
  const [itemsToPack, setItemsToPack] = useState({});

  const setItemsToPackHandler = (item: any) => {
    console.log(item);
    setItemsToPack((currentItemsToPack: any) => {
      const newItemFromDrop: any = {};

      if (!currentItemsToPack.hasOwnProperty(item?.inventoryItem?.id)) {
        newItemFromDrop[item?.inventoryItem?.id] = {
          name: item?.inventoryItem?.name,
          weight: item?.inventoryItem?.weight,
          dimensions: {
            x: item?.inventoryItem?.dimensions?.x,
            y: item?.inventoryItem?.dimensions?.y,
            z: item?.inventoryItem?.dimensions?.z,
          },
          image: item?.inventoryItem?.image,
          quantity: 1,
        };

        return {
          ...currentItemsToPack,
          ...newItemFromDrop,
        };
      } else {
        newItemFromDrop[item?.inventoryItem?.id] = {
          name: item?.inventoryItem?.name,
          weight: item?.inventoryItem?.weight,
          dimensions: {
            x: item?.inventoryItem?.dimensions?.x,
            y: item?.inventoryItem?.dimensions?.y,
            z: item?.inventoryItem?.dimensions?.z,
          },
          image: item?.inventoryItem?.image,
          quantity: currentItemsToPack[item?.inventoryItem?.id].quantity + 1,
        };
        return {
          ...currentItemsToPack,
          ...newItemFromDrop,
        };
      }
    });
  };

  return (
    <ItemsToPackContext.Provider
      value={[itemsToPack, setItemsToPack, setItemsToPackHandler]}
    >
      {children}
    </ItemsToPackContext.Provider>
  );
};
