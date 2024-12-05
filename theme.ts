import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoint: {
    base: "425px",
    sm: "640px",
    md: "768px",
    lg: "1025px",
    xl: "1280px",
    "2xl": "1512px",
  },
});

export default theme;
