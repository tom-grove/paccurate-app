import React, { useState, createContext } from "react";

export const ItemsToPackContext = createContext<any>(null);

export const ItemsToPackProvider: React.FC = ({ children }) => {
  const [itemsToPack, setItemsToPack] = useState({});

  return (
    <ItemsToPackContext.Provider value={[itemsToPack, setItemsToPack]}>
      {children}
    </ItemsToPackContext.Provider>
  );
};
