import React, { useRef, useContext } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { ItemsToPackContext } from "../../contexts/ItemsToPackContext";

// Takes inventoryItem prop that includes name and image info
// Add drag functionality
const InventoryItem = (props: any) => {
  const ref = useRef();
  const { inventoryItem, ...rest } = props;

  const [, , setItemsToPackHandler] = useContext(ItemsToPackContext);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Image",
    item: { inventoryItem: inventoryItem },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  drag(ref);

  return (
    <Flex
      ref={ref}
      justifyContent="center"
      alignItems="center"
      {...rest}
      onDoubleClick={() => {
        setItemsToPackHandler({ inventoryItem: inventoryItem });
      }}
    >
      <Flex direction="column">
        <Flex>
          <Image src={inventoryItem.image} alt={inventoryItem.name} h="128px" />
        </Flex>
        <Flex justifyContent="center">{inventoryItem.name}</Flex>
      </Flex>
    </Flex>
  );
};

export default InventoryItem;
