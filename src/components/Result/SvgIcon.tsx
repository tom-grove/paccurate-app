import * as React from "react";
import { Box } from "@chakra-ui/react";

// Takes raw svg code and displays it
// Force some reasonable mins
function SvgIcon(props: any) {
  const {
    svgSource = "",
    height = "32px",
    width = "32px",
    minHeight = "32px",
    minWidth = "32px",
    ...rest
  } = { ...props };

  return (
    <Box
      height={height}
      width={width}
      minHeight={minHeight}
      minWidth={minWidth}
      dangerouslySetInnerHTML={{ __html: svgSource }}
    ></Box>
  );
}

export default SvgIcon;
