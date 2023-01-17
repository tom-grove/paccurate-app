import React from "react";
import {
  Flex,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// Modal to display session totals
// Returns Button or Modal
const ViewTotals = (props: any) => {
  const {
    totalBoxesPacked = 0,
    totalItemsPacked = 0,
    totalLeftovers = 0,
    totalTimePacking = 0,
    totalCost = 0,
    ...rest
  } = { ...props };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>View Totals</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session Packing Statistics</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" flex="4" overflowY="scroll">
              <Text>Total Boxes Packed: {totalBoxesPacked}</Text>
              <Text>Total Items Packed: {totalItemsPacked}</Text>
              <Text>Total Leftover Items: {totalLeftovers}</Text>
              <Text>Total Time Packing: {totalTimePacking}s</Text>
              <Text>Total Cost of Packages: ${totalCost}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewTotals;
