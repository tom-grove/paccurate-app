import React, { useState, createContext } from "react";

// Context to help manage Box Inventory state
export const InventoryBoxesContext = createContext<any>(null);

export const InventoryBoxesProvider: React.FC = ({ children }) => {
  const [inventoryBoxesSelected, setInventoryBoxesSelected] = useState([]);

  return (
    <InventoryBoxesContext.Provider
      value={[inventoryBoxesSelected, setInventoryBoxesSelected]}
    >
      {children}
    </InventoryBoxesContext.Provider>
  );
};
