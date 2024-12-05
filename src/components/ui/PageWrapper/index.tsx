import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageWrapper = (props: Props) => {
  const { children } = props;
  return (
    <Box w={"100%"} p={"32px 12px"} overflow={"hidden"}>
      {children}
    </Box>
  );
};
