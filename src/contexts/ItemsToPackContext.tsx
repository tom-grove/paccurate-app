import React, { useState, createContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

// Context to help manage Items to Pack state
export const ItemsToPackContext = createContext<any>(null);

export const ItemsToPackProvider: React.FC = ({ children }) => {
  // If this context is being called and used, it is safe to say the application has started
  // Use this component to call our New Features Toast, so that the Toast gets themed
  const newFeaturesToast = useToast();

  useEffect(() => {
    newFeaturesToast({
      duration: 5000,
      title: "New Features",
      description:
        "Now, double-click to add an Inventory Item to the Pick List",
    });
  }, [newFeaturesToast]);

  const [itemsToPack, setItemsToPack] = useState({});

  const setItemsToPackHandler = (item: any) => {
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
