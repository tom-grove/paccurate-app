import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
  IconButton,
  Text,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDrop } from "react-dnd";
import { ItemsToPackContext } from "../../contexts/ItemsToPackContext";
import { get, set } from "lodash";
import { inventoryItems } from "../../data/inventoryItems";

/*

console.log("dropped");
      const droppedInventoryItem = item?.inventoryItem;      

      setItemsToPackLocally((currentItems: any) => {      
        if (droppedInventoryItem) {
          const droppedInventoryItemTableRow = get(
            currentItems,
            droppedInventoryItem?.id
          );

          if (droppedInventoryItemTableRow) {
            droppedInventoryItemTableRow.quantity++;
            set(
              currentItems,
              droppedInventoryItem.id,
              droppedInventoryItemTableRow
            );
          } else {
            set(currentItems, droppedInventoryItem?.id, {
              name: droppedInventoryItem?.name,
              weight: droppedInventoryItem?.weight,
              dimensions: {
                x: droppedInventoryItem?.dimensions?.x,
                y: droppedInventoryItem?.dimensions?.y,
                z: droppedInventoryItem?.dimensions?.z,
              },
              image: droppedInventoryItem?.image,
              quantity: 1,
            });
          }
        }        

        currentItems.push(droppedInventoryItem);
        console.log(currentItems);

        return currentItems;
      });

*/

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

  useEffect(() => {
    console.log("Inventory Items Updated!");
    console.log(itemsToPack);
  }, [itemsToPack]);

  useEffect(() => {
    console.log("render");
  });

  drop(ref);

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
                    <IconButton aria-label="Delete Item" icon={<DeleteIcon />}>
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
