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

// Creates a table of items from inventory
const ItemsToPack = () => {
  const [itemsToPack, setItemsToPack, setItemsToPackHandler] =
    useContext(ItemsToPackContext);
  const ref = useRef(null);

  // Setup drop functions to received Inventory Images
  const [, drop] = useDrop({
    accept: "Image",
    drop: (item: any) => {
      setItemsToPackHandler(item);
    },
  });

  // enable drop on element reference
  drop(ref);

  // delete pick list item handler
  // be sure to remove item if no quantity remains
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
    <Box h="94%" width="100%" ref={ref}>
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
