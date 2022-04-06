import React, { createRef, useRef } from "react";
import { Box } from "@chakra-ui/react";
import InventoryItem from "./InventoryItem";
import { inventoryItems } from "../../data/inventoryItems";

const InventoryItems = () => {
  return (
    <Box>
      {inventoryItems.map((inventoryItem, index) => {
        return (
          <InventoryItem
            key={index}
            itemName={inventoryItem.name}
            itemPic={inventoryItem.image}
            py="20px"
          />
        );
      })}
    </Box>
  );
};

export default InventoryItems;
