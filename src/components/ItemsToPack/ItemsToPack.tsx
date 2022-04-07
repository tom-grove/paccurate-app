import React, { useRef, useContext, useCallback } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  IconButton,
  Text,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDrop } from "react-dnd";
import { ItemsToPackContext } from "../../contexts/ItemsToPackContext";

const ItemsToPack = () => {
  const [itemsToPack, setItemsToPack] = useContext(ItemsToPackContext);
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Image",
    drop: (item: any) =>
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
      }),
    hover(item) {
      //console.log("hovering");
    },
  });

  drop(ref);

  const deleteItemFromPickList = useCallback(
    (itemId: any) => {
      if (itemsToPack.hasOwnProperty(itemId)) {
        if (itemsToPack[itemId].quantity > 1) {
          itemsToPack[itemId].quantity--;
        } else {
          delete itemsToPack[itemId];
        }
        setItemsToPack({ ...itemsToPack });
      }
    },
    [itemsToPack, setItemsToPack]
  );

  return (
    <Box h="94%" ref={ref}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Quantity</Th>
              <Th>Dimensions (x,y,z)</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(itemsToPack).map((inventoryItem, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Center>
                      <Image
                        src={itemsToPack[inventoryItem].image}
                        alt={itemsToPack[inventoryItem].name}
                        h="32px"
                      />
                    </Center>
                  </Td>
                  <Td>{itemsToPack[inventoryItem].name}</Td>
                  <Td>
                    <Center>{itemsToPack[inventoryItem].quantity}</Center>
                  </Td>
                  <Td>
                    <Text>
                      ({itemsToPack[inventoryItem].dimensions.x},{" "}
                      {itemsToPack[inventoryItem].dimensions.y},{" "}
                      {itemsToPack[inventoryItem].dimensions.z})
                    </Text>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Delete Item"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        deleteItemFromPickList(inventoryItem);
                      }}
                    >
                      Remove
                    </IconButton>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ItemsToPack;
