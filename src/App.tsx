import React from "react";
import { ChakraProvider, Text, Flex, Image, extendTheme } from "@chakra-ui/react";
import InventoryItems from "./components/InventoryItems";
import ItemsToPack from "./components/ItemsToPack";
import InventoryBoxes from "./components/InventoryBoxes";
import Result from "./components/Result";
import paccurateLogo from "./assets/images/paccurateLogo.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ItemsToPackProvider } from "./contexts/ItemsToPackContext";
import { InventoryBoxesProvider } from "./contexts/InventoryBoxesContext";

const theme = extendTheme({
  styles: {
    global: {
      "line.volume-line": {
        "stroke": "#666",
        "strokeDasharray": "2,1",
        "strokeWidth": 1,
      },
      "polygon.volume-line": {
        "stroke": "black",
        "strokeWidth": 1,
        "fillOpacity": 0.5,
        "strokeOpacity": 1,
      },
      "polygon.volume-line.solid": {
        "fillOpacity": 1,
        "transitionDuration": "0.2s",
        "strokeOpacity": 1,
      }
    }
  }
})

// Main app
// Contains mostly Layout information and makes calls to other components
// Setup for Context Providers done here too
export const App = () => {
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
            <Text>Paccurate Picker</Text>
          </Flex>
          <Flex flex="1 150px" pr="10px" justifyContent="end"></Flex>
        </Flex>

        <ItemsToPackProvider>
          <InventoryBoxesProvider>
            <Flex flex="1" direction="column">
              <Flex flex="5" width="100%" maxHeight="calc(50vh - 50px)">
                <DndProvider backend={HTML5Backend}>
                  <Flex
                    direction="column"
                    flex="2"
                    justifyContent="center"
                    maxWidth="250px"
                  >
                    <Flex justifyContent="center">
                      <Text as="u">Inventory</Text>
                    </Flex>
                    <Flex overflowX="hidden" overflowY="scroll">
                      <InventoryItems />
                    </Flex>
                  </Flex>
                  <Flex direction="column" flex="6" alignItems="center">
                    <Flex justifyContent="center">
                      <Text as="u">Pick List</Text>
                    </Flex>
                    <Flex
                      height="100%"
                      width="100%"
                      overflowX="hidden"
                      overflowY="scroll"
                    >
                      <ItemsToPack />
                    </Flex>
                  </Flex>
                </DndProvider>
                <Flex direction="column" flex="2" maxWidth="250px">
                  <Flex>
                    <Text ml="20px" as="u">
                      Boxes
                    </Text>
                  </Flex>

                  <InventoryBoxes />
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
