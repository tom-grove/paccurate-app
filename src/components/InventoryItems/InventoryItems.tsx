import React from "react";
import { Box } from "@chakra-ui/react";
import InventoryItem from "./InventoryItem";
import { inventoryItems } from "../../data/inventoryItems";

// Iterates over the predefined list of Inventory Items provided by our 'database' (it's just a file :))
// Creates new InventoryItem for each iteration
const InventoryItems = () => {
  return (
    <Box>
      {inventoryItems.map((inventoryItem, index) => {
        return (
          <InventoryItem key={index} inventoryItem={inventoryItem} py="20px" />
        );
      })}
    </Box>
  );
};

export default InventoryItems;
