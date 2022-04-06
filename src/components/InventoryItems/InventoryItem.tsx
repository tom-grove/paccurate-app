import React, { useRef } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useDrag } from "react-dnd";

const InventoryItem = (props: any) => {
  const ref = useRef();
  const { itemPic, itemName, ...rest } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Image",
    item: { name: itemName },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  drag(ref);

  return (
    <Flex ref={ref} justifyContent="center" alignItems="center" {...rest}>
      <Flex direction="column">
        <Flex>
          <Image src={itemPic} alt={itemName} h="128px" />
        </Flex>
        <Flex justifyContent="center">{itemName}</Flex>
      </Flex>
    </Flex>
  );
};

export default InventoryItem;
