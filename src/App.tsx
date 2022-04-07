import React, { useEffect } from "react";
import { ChakraProvider, Text, Flex, theme, Image } from "@chakra-ui/react";
import InventoryItems from "./components/InventoryItems";
import ItemsToPack from "./components/ItemsToPack";
import Boxes from "./components/InventoryBoxes";
import Result from "./components/Result";
import paccurateLogo from "./assets/images/paccurateLogo.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemsToPackProvider } from "./contexts/ItemsToPackContext";
import { InventoryBoxesProvider } from "./contexts/InventoryBoxesContext";

export const App = () => {
  useEffect(() => {
    console.log("App Loaded!");
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex
        direction="column"
        minHeight="100vh"
        fontSize="xl"
        overflow="hidden"
      >
        <Flex
          flexBasis="50px"
          alignItems="center"
          borderBottom="solid black 1px"
        >
          <Flex flex="1 150px" pr="10px" justifyContent="beginning">
            <Image
              src={paccurateLogo}
              h="40px"
              w="150px"
              pl="10px"
              alt="Paccurate Logo"
            />
          </Flex>
          <Flex flex="1" justifyContent="center" alignItems="center">
            <Text>Paccurate Picker by Tom</Text>
          </Flex>
          <Flex flex="1 150px" pr="10px" justifyContent="end"></Flex>
        </Flex>

        <ItemsToPackProvider>
          <InventoryBoxesProvider>
            <Flex flex="1" direction="column">
              <Flex flex="5" maxHeight="calc(50vh - 50px)">
                <DndProvider backend={HTML5Backend}>
                  <Flex
                    flex="2"
                    justifyContent="center"
                    overflowX="hidden"
                    overflowY="scroll"
                  >
                    <InventoryItems />
                  </Flex>
                  <Flex
                    flex="6"
                    justifyContent="center"
                    alignItems="center"
                    maxWidth="calc(60vw)"
                    overflowY="scroll"
                    overflowX="hidden"
                  >
                    <ItemsToPack />
                  </Flex>
                </DndProvider>
                <Flex flex="2" justifyContent="center">
                  <Boxes />
                </Flex>
              </Flex>
              <Flex flex="5" justifyContent="center" alignItems="center">
                <Result />
              </Flex>
            </Flex>
          </InventoryBoxesProvider>
        </ItemsToPackProvider>
      </Flex>
    </ChakraProvider>
  );
};
