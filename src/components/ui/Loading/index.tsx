import { Flex, Spinner } from "@chakra-ui/react";

interface Props {
  height?: string;
  size?: string;
}
export const Loading = (props: Props) => {
  const { height = "500px", size = "xl" } = props;
  return (
    <Flex height={height} justifyContent={"center"} alignItems={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#6e9c92"
        size={size}
      />
    </Flex>
  );
};
