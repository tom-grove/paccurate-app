import * as React from "react";
import { Flex, Text } from "@chakra-ui/react";

// Displays packing request information in panel
function PackingInformation(props: any) {
  const { paccurateRequestInfo = {}, ...rest } = { ...props };

  return (
    <Flex {...rest}>
      <Flex>
        <Text as="u"> Packing Information</Text>
      </Flex>
      <Text>Boxes: {paccurateRequestInfo?.lenBoxes}</Text>
      <Text>Items: {paccurateRequestInfo?.lenItems}</Text>
      <Text>Calc Time: {paccurateRequestInfo?.totalTime}s</Text>
      <Text>Cost of Boxes: ${paccurateRequestInfo?.totalCost}</Text>
      <Text>Leftovers ({paccurateRequestInfo?.lenLeftovers || 0}):</Text>
      {paccurateRequestInfo?.leftovers?.map((leftoverItem: any, index: any) => {
        return (
          <Flex key={index} direction="column" mx="4px">
            <Flex>{leftoverItem.item.name}</Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default PackingInformation;
