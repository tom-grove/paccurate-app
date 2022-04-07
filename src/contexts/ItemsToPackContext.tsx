import React, { useState, createContext } from "react";

// Context to help manage Items to Pack state
export const ItemsToPackContext = createContext<any>(null);

export const ItemsToPackProvider: React.FC = ({ children }) => {
  const [itemsToPack, setItemsToPack] = useState({});

  return (
    <ItemsToPackContext.Provider value={[itemsToPack, setItemsToPack]}>
      {children}
    </ItemsToPackContext.Provider>
  );
};
