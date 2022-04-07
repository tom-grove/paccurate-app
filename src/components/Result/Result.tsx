import React, { useContext, useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { InventoryBoxesContext } from "../../contexts/InventoryBoxesContext";
import { ItemsToPackContext } from "../../contexts/ItemsToPackContext";
import { inventoryBoxTypes } from "../../data/inventoryBoxTypes";
import axios from "axios";
import { apiKey } from "../../data/apiKey";
import SvgIcon from "./SvgIcon";

const Result = () => {
  const [itemsToPack, setItemsToPack] = useContext(ItemsToPackContext);
  const [inventoryBoxesSelected, setInventoryBoxesSelected] = useContext(
    InventoryBoxesContext
  );
  const [packedBoxes, setPackedBoxes] = useState([]);
  const [packedBoxContents, setPackedBoxContents] = useState([]);

  const createPaccuratePacket = () => {
    const itemSets = Object.keys(itemsToPack).map(
      (itemToPack: any, index: any) => {
        return {
          refId: parseInt(itemToPack),
          name: itemsToPack[itemToPack].name,
          weight: parseInt(itemsToPack[itemToPack].weight),
          dimensions: itemsToPack[itemToPack].dimensions,
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

  const sendToPaccurate = (paccuratePacket: any) => {
    const apiAuthorizationHeader = {
      headers: {
        Authorization: "apikey " + apiKey.key,
      },
    };

    console.log(paccuratePacket);

    axios
      .post(
        "https://api.paccurate.io/",
        paccuratePacket,
        apiAuthorizationHeader
      )
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        const paccurateResponse = res.data;
        const packedBoxes = paccurateResponse.boxes;
        const packedBoxSvgs = paccurateResponse.svgs;

        packedBoxSvgs.forEach((packedBoxSvg: any, index: any) => {
          packedBoxes[index].box["svg"] = packedBoxSvg;
        });

        if (packedBoxes.length > 0) {
          setPackedBoxes(packedBoxes);
        }
      });
  };

  const packClickHandler = () => {
    const paccuratePacket = createPaccuratePacket();
    sendToPaccurate(paccuratePacket);
  };

  const packedBoxClickHandler = (packedBox: any) => {
    setPackedBoxContents(packedBox.box.items);
  };

  useEffect(() => {
    if (
      Object.keys(itemsToPack).length > 0 &&
      inventoryBoxesSelected.length > 0
    ) {
      console.log("Auto sender logger...");
    }
  }, [itemsToPack, inventoryBoxesSelected]);

  return (
    <Flex direction="column" flex="1" height="50vh">
      <Flex borderY="solid black 1px">
        <Flex flex="1" alignItems="center" justifyContent="center">
          <Button
            m="8px"
            onClick={() => {
              packClickHandler();
            }}
          >
            Pack
          </Button>
          <Button
            m="8px"
            onClick={() => {
              console.log("View Totals");
            }}
          >
            View Totals
          </Button>
        </Flex>
      </Flex>
      <Flex flex="1">
        <Flex direction="column" flex="3" overflowY="scroll">
          <Flex>Packed Boxes</Flex>
          {packedBoxes.map((packedBox: any, index: any) => {
            return (
              <Flex>
                <Flex>
                  <SvgIcon svgSource={packedBox.box.svg} />
                </Flex>
                <Flex
                  flex="1"
                  as={Button}
                  key={index}
                  direction="column"
                  m="10px"
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
          <Flex direction="column" flex="4" overflowY="scroll">
            <Flex>Packed Box Contents</Flex>
            {packedBoxContents.map((packedBoxItem: any, index: any) => {
              return (
                <Flex key={index} direction="column" m="10px">
                  <Flex>{packedBoxItem.item.name}</Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
        <Flex flex="2">
          <Flex direction="column" flex="4" overflowY="scroll">
            <Flex>Packing Information</Flex>
            {packedBoxes.map((packedBox: any, index: any) => {
              return (
                <Flex key={index} direction="column" m="10px">
                  <Flex>{packedBox.box.name}</Flex>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Result;
