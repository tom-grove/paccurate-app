import React, { useContext } from "react";
import { Flex, CheckboxGroup, Checkbox, Stack } from "@chakra-ui/react";
import { inventoryBoxTypes } from "../../data/inventoryBoxTypes";
import { InventoryBoxesContext } from "../../contexts/InventoryBoxesContext";

// Iterates over box inventory and creates a checkbox representing each one
const InventoryBoxes = () => {
  const [inventoryBoxesSelected, setInventoryBoxesSelected] = useContext(
    InventoryBoxesContext
  );

  return (
    <Flex
      direction="column"
      p="20px"
      w="100%"
      overflowX="hidden"
      overflowY="scroll"
    >
      <CheckboxGroup
        value={inventoryBoxesSelected}
        onChange={(inventoryBoxesChangedState) => {
          setInventoryBoxesSelected(inventoryBoxesChangedState);
        }}
      >
        <Stack spacing="15px">
          {inventoryBoxTypes.map((inventoryBoxType, index) => {
            return (
              <Checkbox key={index} value={inventoryBoxType.id.toString()}>
                {inventoryBoxType.name}
              </Checkbox>
            );
          })}
        </Stack>
      </CheckboxGroup>
    </Flex>
  );
};

export default InventoryBoxes;
