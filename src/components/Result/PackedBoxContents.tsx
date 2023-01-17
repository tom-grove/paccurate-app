import React from "react";
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

// Displays contents of a packed box in table format
const PackedBoxContents = (props: any) => {
  const { packedBoxContents = {}, ...rest } = { ...props };

  return (
    <Box h="94%">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(packedBoxContents).map(
              (inventoryItem: any, index: any) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Image
                        src={packedBoxContents[inventoryItem].image}
                        alt={packedBoxContents[inventoryItem].name}
                        h="32px"
                      />
                    </Td>
                    <Td>{packedBoxContents[inventoryItem].name}</Td>
                    <Td>
                      <Center>
                        {packedBoxContents[inventoryItem].quantity}
                      </Center>
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PackedBoxContents;
