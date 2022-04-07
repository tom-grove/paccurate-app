import * as React from "react";
import { Box } from "@chakra-ui/react";

function SvgIcon(props: any) {
  const { svgSource = "", ...rest } = { ...props };

  return (
    <Box
      height="32px"
      width="32px"
      dangerouslySetInnerHTML={{ __html: svgSource }}
    ></Box>
  );
}

export default SvgIcon;
