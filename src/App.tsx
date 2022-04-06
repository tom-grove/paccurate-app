import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Flex,
  theme,
  Image,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import InventoryItems from "./components/InventoryItems";
import ItemsToPack from "./components/ItemsToPack";
import Boxes from "./components/Boxes";
import Result from "./components/Result";
import paccurateLogo from "./assets/images/paccurateLogo.svg";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex direction="column" minHeight="100vh" fontSize="xl" overflow="hidden">
      <Flex flexBasis="50px" alignItems="center">
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
        <Flex flex="1 150px" pr="10px" justifyContent="end">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>

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
              bgColor="yellow"
              justifyContent="center"
              alignItems="center"
            >
              <ItemsToPack />
            </Flex>
          </DndProvider>
          <Flex
            flex="2"
            bgColor="pink"
            justifyContent="center"
            alignItems="center"
          >
            <Boxes />
          </Flex>
        </Flex>
        <Flex
          flex="5"
          bgColor="orange"
          justifyContent="center"
          alignItems="center"
        >
          <Result />
        </Flex>
      </Flex>
    </Flex>
  </ChakraProvider>
);
