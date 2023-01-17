import React, { useContext, useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { InventoryBoxesContext } from "../../contexts/InventoryBoxesContext";
import { ItemsToPackContext } from "../../contexts/ItemsToPackContext";
import { inventoryBoxTypes } from "../../data/inventoryBoxTypes";
import { inventoryItems } from "../../data/inventoryItems";
import axios from "axios";
import SvgIcon from "./SvgIcon";
import ViewTotals from "./ViewTotals";
import PackedBoxContents from "./PackedBoxContents";
import PackingInformation from "./PackingInformation";

export const apiKey = {
  key: process.env["REACT_APP_API_KEY"],
}

// Used to initialize and reset request info panel
const DEFAULT_REQEST_INFO = {
  leftovers: [],
  lenBoxes: 0,
  lenItems: 0,
  lenLeftovers: 0,
  totalTime: 0,
  totalCost: 0,
};

// Make calls to Paccurate and handle reply
const Result = () => {
  // Get contexts to know which items are packed and which boxes are available
  const [itemsToPack, setItemsToPack] = useContext(ItemsToPackContext);
  const [inventoryBoxesSelected, setInventoryBoxesSelected] = useContext(
    InventoryBoxesContext
  );
  // State variables for packed boxes, box contents, and request information
  const [packedBoxes, setPackedBoxes] = useState([]);
  const [packedBoxContents, setPackedBoxContents] = useState([]);
  const [packedBoxSvg, setPackedBoxSvg] = useState("");
  const [paccurateRequestInfo, setPaccurateRequestInfo] =
    useState(DEFAULT_REQEST_INFO);

  // State variables for Session Totals
  const [totalBoxesPacked, setTotalBoxesPacked] = useState(0);
  const [totalItemsPacked, setTotalItemsPacked] = useState(0);
  const [totalLeftovers, setTotalLeftovers] = useState(0);
  const [totalTimePacking, setTotalTimePacking] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Create data packet conforming to Paccurate docs
  const createPaccuratePacket = () => {
    const itemSets = Object.keys(itemsToPack).map(
      (itemToPack: any, index: any) => {
        return {
          refId: parseInt(itemToPack),
          name: itemsToPack[itemToPack].name,
          weight: parseInt(itemsToPack[itemToPack].weight),
          dimensions: itemsToPack[itemToPack].dimensions,
          color: itemsToPack[itemToPack].color,
          quantity: parseInt(itemsToPack[itemToPack].quantity),
        };
      }
    );
    const boxTypes = inventoryBoxesSelected.map(
      (inventoryBoxSelected: any, index: any) => {
        return {
          weightMax: inventoryBoxTypes[inventoryBoxSelected].weightMax,
          name: inventoryBoxTypes[inventoryBoxSelected].name,
          dimensions: inventoryBoxTypes[inventoryBoxSelected].dimensions,
          price: inventoryBoxTypes[inventoryBoxSelected].price,
        };
      }
    );

    const paccuratePacket = {
      itemSets: itemSets,
      boxTypes: boxTypes,
      includeScripts: false,
    };

    return paccuratePacket;
  };

  // API call to Paccurate backend
  const sendToPaccurate = (paccuratePacket: any) => {
    const apiAuthorizationHeader = {
      headers: {
        Authorization: "apikey " + apiKey.key,
      },
    };

    axios
      .post(
        "https://api.paccurate.io/",
        paccuratePacket,
        apiAuthorizationHeader
      )
      .then((res) => {
        // Grab important bits from response
        const paccurateResponse = res.data;
        const packedBoxes = paccurateResponse.boxes;
        const packedBoxSvgs = paccurateResponse.svgs;

        // Grab the svgs and put them in an easy to access location
        packedBoxSvgs.forEach((packedBoxSvg: any, index: any) => {
          packedBoxes[index].box["svg"] = packedBoxSvg;
        });

        // Set packed boxes if we have any
        if (packedBoxes.length > 0) {
          setPackedBoxes(packedBoxes);
        }

        // Set info panel data
        setPaccurateRequestInfo({
          leftovers: paccurateResponse.leftovers,
          lenBoxes: paccurateResponse.lenBoxes,
          lenItems: paccurateResponse.lenItems,
          lenLeftovers: paccurateResponse.lenLeftovers,
          totalTime: paccurateResponse.totalTime,
          totalCost: paccurateResponse.totalCost,
        });

        // Update session totals
        setTotalBoxesPacked((currentTotalBoxesPacked) => {
          currentTotalBoxesPacked += paccurateResponse.lenBoxes;
          return currentTotalBoxesPacked;
        });
        setTotalItemsPacked((currentTotalItemsPacked) => {
          currentTotalItemsPacked +=
            paccurateResponse.lenItems - paccurateResponse.lenLeftovers;
          return currentTotalItemsPacked;
        });
        setTotalLeftovers((currentTotalLeftovers) => {
          currentTotalLeftovers += paccurateResponse.lenLeftovers;
          return currentTotalLeftovers;
        });
        setTotalTimePacking((currentTotalTimePacking) => {
          currentTotalTimePacking += paccurateResponse.totalTime;
          return currentTotalTimePacking;
        });
        setTotalCost((currentTotalCost) => {
          currentTotalCost += paccurateResponse.totalCost;
          return currentTotalCost;
        });
      });
  };

  // Iterates over items in a box and creates a quantity for each item type
  // Uses custom SvgIcon component to display fancy svg stuff
  const quantifyPackedBoxItems = (items: any) => {
    const quantifiedItems: any = {};

    items.forEach((item: any, index: any) => {
      if (!quantifiedItems.hasOwnProperty(item?.item?.refId)) {
        quantifiedItems[item?.item?.refId] = {
          image: inventoryItems[item?.item?.refId].image,
          name: item?.item?.name,
          quantity: 1,
        };
      } else {
        quantifiedItems[item?.item?.refId].quantity++;
      }
    });

    return quantifiedItems;
  };

  const packClickHandler = () => {
    setPackedBoxSvg("");
    setPackedBoxContents([]);
    const paccuratePacket = createPaccuratePacket();
    sendToPaccurate(paccuratePacket);
  };

  const packedBoxClickHandler = (packedBox: any) => {
    setPackedBoxSvg(packedBox.box.svg);
    const quantifiedItems = quantifyPackedBoxItems(packedBox.box.items);
    setPackedBoxContents(quantifiedItems);
  };

  const clearListClickHandler = () => {
    setPackedBoxSvg("");
    setPackedBoxContents([]);
    setPaccurateRequestInfo(DEFAULT_REQEST_INFO);
    setPackedBoxes([]);
    setItemsToPack({});
    setInventoryBoxesSelected([]);
  };

  return (
    <Flex direction="column" flex="1" height="50vh">
      <Flex flexBasis="50px" borderY="solid black 1px">
        <Flex flex="1" alignItems="center" justifyContent="center">
          <Flex flex="55" justifyContent="space-between" alignItems="center">
            <ViewTotals
              totalBoxesPacked={totalBoxesPacked}
              totalItemsPacked={totalItemsPacked}
              totalLeftovers={totalLeftovers}
              totalTimePacking={totalTimePacking}
              totalCost={totalCost}
            />
            <Button
              m="8px"
              onClick={() => {
                packClickHandler();
              }}
            >
              Pack
            </Button>
          </Flex>
          <Flex flex="45" justifyContent="flex-end">
            <Button
              m="8px"
              onClick={() => {
                clearListClickHandler();
              }}
            >
              Clear Lists
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex flex="1" maxHeight="calc(50vh - 50px)">
        <Flex direction="column" flex="3" overflowY="scroll">
          <Flex justifyContent="center">
            <Text as="u">Packed Boxes</Text>
          </Flex>
          {packedBoxes.map((packedBox: any, index: any) => {
            return (
              <Flex key={index} m="10px">
                <Flex mr="5px">
                  <SvgIcon svgSource={packedBox.box.svg} />
                </Flex>
                <Flex
                  flex="1"
                  as={Button}
                  direction="column"
                  onClick={() => {
                    packedBoxClickHandler(packedBox);
                  }}
                >
                  <Flex>{packedBox.box.name}</Flex>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex flex="5">
          <Flex direction="column" flex="4">
            <Flex justifyContent="center">
              <Text as="u">Packed Box Contents</Text>
            </Flex>
            <Flex
              flex="1"
              height="100%"
              width="100%"
              minHeight="200px"
              maxHeight="200px"
              minWidth="200px"
              overflow="scroll"
              paddingTop="10px"
            >
              <SvgIcon
                height="170px"
                width="170px"
                minHeight="170px"
                minWidth="170px"
                svgSource={packedBoxSvg}
              />
            </Flex>
            <Flex flex="1" direction="column" overflowY="scroll">
              <PackedBoxContents packedBoxContents={packedBoxContents} />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex="2">
          <PackingInformation
            paccurateRequestInfo={paccurateRequestInfo}
            direction="column"
            flex="4"
            overflowY="scroll"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Result;
